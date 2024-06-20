import {ITextModel} from 'vs/editor/common/model';
import {
	Editor,
	VirtualRenderer,
	Ace,
	createEditSession,
	Range,
	MarkerGroup, HoverTooltip,
	config, Autocomplete
} from 'vs/editor/browser/widget/aceEditor/ace-editor';
import {
	fromAceDelta,
	fromAcePosition, mergeRanges,
	toAceRange,
	toAnnotations,
	toCompletion, toMarkerGroupItemDiagnostics
} from 'vs/editor/browser/widget/aceEditor/converters';
import {mapToAceMode} from 'vs/editor/browser/widget/aceEditor/modesMapper';
import IModelContentChange = monaco.editor.IModelContentChange;
import {ViewModel} from 'vs/editor/common/viewModel/viewModelImpl';
import {ISelection, Selection} from 'vs/editor/common/core/selection';
import {ILanguageFeaturesService} from 'vs/editor/common/services/languageFeatures';
import {CompletionOptions, provideSuggestionItems} from 'vs/editor/contrib/suggest/browser/suggest';
import {CompletionContext, CompletionTriggerKind} from 'vs/editor/common/languages';
import {CancellationToken, CancellationTokenSource} from 'vs/base/common/cancellation';
import {IMarker, IMarkerService} from 'vs/platform/markers/common/markers';
import {URI} from 'vs/base/common/uri';
import {getHoversPromise} from 'vs/editor/contrib/hover/browser/getHover';
import {IColorTheme, IThemeService} from 'vs/platform/theme/common/themeService';
import {ThemeConverter, VirtualTheme} from 'vs/editor/browser/widget/aceEditor/virtualTheme';

interface FileSession {
	session: Ace.EditSession;
	occurrenceMarkers?: MarkerGroup;
	diagnosticMarkers?: MarkerGroup;
}

//TODO: other event types
//TODO: single line editor
//TODO: keybindings
//TODO: disposal
//TODO: ace extensions
export class AceEditor {
	private textModel?: ITextModel;
	public editor?: Ace.Editor;
	private domElement: HTMLElement;
	private sessions: { [uri: string]: FileSession } = {};
	private changesIdentifier: number;
	private viewModel?: ViewModel;
	private applyingDeltas: boolean;
	private languageFeaturesService: ILanguageFeaturesService;
	private _requestToken?: CancellationTokenSource;
	private markerService: IMarkerService;
	private $hoverTooltip: HoverTooltip;
	private themeService: IThemeService;

	constructor(domElement: HTMLElement, languageFeaturesService: ILanguageFeaturesService, markerService: IMarkerService, themeService: IThemeService) {
		config.set('sharedPopups', true);
		this.markerService = markerService;
		this.subscribeToDiagnosticChanges();
		this.domElement = domElement;
		this.changesIdentifier = 12345;
		this.applyingDeltas = false;
		this.languageFeaturesService = languageFeaturesService;
		this.$hoverTooltip = new HoverTooltip();
		this.themeService = themeService;
		this.themeService.onDidColorThemeChange((theme) => {
			this.applyTheme(theme);
		});
	}

	registerCompleters(editor: Ace.Editor) {
		const completer: Ace.Completer = {
			getCompletions: async (editor: Ace.Editor, session: Ace.EditSession, pos: Ace.Point, prefix: string, callback) => {
				const completions = await this.getCompletions(editor);
				if (Array.isArray(completions) && completions.length > 0) {
					if (Array.isArray(completions[0]['triggerCharacters'])) {
						completer.triggerCharacters = completions[0]['triggerCharacters'];
					}
				}
				//@ts-ignore
				callback(null, completions);
			},
			/*getDocTooltip: (item: Ace.Completion) => {
				return item;
			},*/ //TODO: add documentation
			id: 'vscodeCompleters'
		};
		editor.completers = [
			completer
		];
	}

	private subscribeToDiagnosticChanges() {
		this.markerService.onMarkerChanged((resources: readonly URI[]) => {
			this.handleDiagnosticChanges(resources);
		});
	}

	private handleDiagnosticChanges(resources: readonly URI[]) {
		resources.forEach(resource => {
			const diagnostics = this.markerService.read({resource});
			const fileSession = this.sessions[resource.toString()];
			if (fileSession) {
				this.applyDiagnosticsToSession(diagnostics, fileSession);
			}
		});
	}

	private applyDiagnosticsToSession(diagnostics: IMarker[], fileSession: FileSession) {
		if (!diagnostics || !this.editor) {
			return;
		}
		fileSession.session.clearAnnotations();
		let annotations = toAnnotations(diagnostics);
		if (annotations && annotations.length > 0) {
			fileSession.session.setAnnotations(annotations);
		}
		if (!fileSession.diagnosticMarkers) {
			fileSession.diagnosticMarkers = new MarkerGroup(fileSession.session);
		}
		fileSession.diagnosticMarkers.setMarkers(diagnostics?.map((el) => toMarkerGroupItemDiagnostics(new Range(el.startLineNumber - 1, el.startColumn - 1, el.endLineNumber - 1, el.endColumn - 1), el.severity, el.message)));
	}

	private $selectionChange = () => {
		setTimeout(() => {
			const selections: readonly ISelection[] = this.editor!.selection.getAllRanges().map((range) => {
				return {
					selectionStartLineNumber: range.start.row,
					selectionStartColumn: range.start.column,
					positionLineNumber: range.end.row,
					positionColumn: range.end.column
				};
			});
			this.viewModel?.setSelections('ace', selections);
		}, 0);
	};

	private $changeListener = (delta: Ace.Delta) => {
		if (this.applyingDeltas) {
			return;
		}
		if (!this.editor) {
			this.editor = this.createEditor();
		}
		//TODO: selections should be formed before deltas are applied
		const selections = this.editor.selection.getAllRanges().map((range) => {
			return new Selection(range.start.row, range.start.column, range.end.row, range.end.column);
		});
		const eol = this.editor.session.doc.getNewLineCharacter();
		const edit = fromAceDelta(delta, eol, this.changesIdentifier);
		this.textModel?.pushEditOperations(selections, [edit], () => []);
	};

	private createEditor() {
		const session = this.createSession();
		const editor = new Editor(new VirtualRenderer(this.domElement), session, {
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: true,
			customScrollbar: true,
			displayIndentGuides: true,
			highlightIndentGuides: true
		});
		this.registerCompleters(editor);
		this.setStyle(editor); //TODO: I really don't like this part
		this.createHoverTooltip(editor);
		this.applyTheme(undefined, editor);
		return editor;
	}

	applyTheme(theme?: IColorTheme, editor?: Ace.Editor) {
		theme ??= this.themeService.getColorTheme();
		const convertedTheme = ThemeConverter.convertTheme(theme);
		editor ??= this.editor;
		if (convertedTheme) {
			//@ts-expect-error
			editor?.setTheme(convertedTheme);
			this.setupAutocomplete(convertedTheme, editor);
		}
	}

	setupAutocomplete(convertedTheme: VirtualTheme, editor?: Ace.Editor) {
		if (!editor) {
			return;
		}
		let completer: Ace.Autocomplete;
		if (!editor.completer) {
			completer = Autocomplete.for(editor);
		} else {
			completer = editor.completer;
		}
		completer.editor = editor;
		const popup = completer.getPopup();
		popup.setTheme(convertedTheme);
	}

	createHoverTooltip(editor: Ace.Editor) {
		this.$hoverTooltip.setDataProvider(async (e: any, editor: Ace.Editor) => {
			const uri = this.textModel?.uri.toString() || '';
			const session = this.sessions[uri].session;
			const docPos: Ace.Point = e.getDocumentPosition();

			if (!session) {
				return;
			}
			const errorMarker = this.sessions[uri].diagnosticMarkers?.getMarkerAtPosition(docPos);
			const hovers = await getHoversPromise(this.languageFeaturesService.hoverProvider, this.textModel!, fromAcePosition(docPos), CancellationToken.None);
			if (!errorMarker && hovers.length === 0) {
				return;
			}

			let allRanges = hovers.map((hover) => {
				if (hover.range) {
					return toAceRange(hover.range);
				}
				return;
			}).filter((range): range is Ace.IRange => !!range);
			allRanges = mergeRanges(allRanges);
			let hoverRange;
			if (allRanges.length > 0) {
				hoverRange = allRanges[0] as Ace.Range;
			}

			let range = hoverRange || errorMarker?.range;
			range = range ? Range.fromPoints(range.start, range.end) : session.getWordRange(docPos.row, docPos.column);
			const hoverNode = document.createElement('div');
			if (hoverNode) {
				//TODO render markdown using ace markdown mode
				hoverNode.innerHTML = hovers.map((hover) => {
					if (hover.contents) {
						return hover.contents.map((el) => {
							if (el.value !== '') {
								return el.value;
							}
							return;
						}).join('\n');
					}
					return;
				}).join('\n');
			}

			const domNode = document.createElement('div');

			if (errorMarker) {
				const errorDiv = document.createElement('div');
				const errorText = document.createTextNode(errorMarker.tooltipText?.trim() || '');
				errorDiv.appendChild(errorText);
				domNode.appendChild(errorDiv);
			}

			if (hoverNode) {
				domNode.appendChild(hoverNode);
			}
			this.$hoverTooltip.showForRange(editor, range, domNode, e);
		});
		this.$hoverTooltip.addToEditor(editor);
	}

	getNewLineMode(eol?: string) {
		if (eol === '\r\n') {
			return 'windows';
		} else {
			return 'unix';
		}
	}

	setMode(mode: string) {
		this.editor?.session.setMode(mapToAceMode(mode));
	}

	setTextModel(model: ITextModel) {
		this.textModel = model;
		if (!this.editor) {
			this.editor = this.createEditor();
		}
		this.setSession();
	}

	setViewModel(model: ViewModel) {
		this.viewModel = model;
	}

	setSession() {
		const uri = this.textModel?.uri.toString() || '';
		const session = this.sessions[uri]?.session ?? this.createSession(uri);
		this.editor?.setSession(session);
	}

	createSession(uri?: string) {
		uri ??= this.textModel?.uri.toString() || '';

		const fileSession = {
			session: createEditSession(this.textModel?.getValue() || '', mapToAceMode(this.textModel!.getLanguageId()))
		};
		fileSession.session.doc.on('change', this.$changeListener, true);
		fileSession.session.selection.on('changeSelection', this.$selectionChange);
		fileSession.session.setNewLineMode(this.getNewLineMode(this.textModel?.getEOL()));
		this.sessions[uri] = fileSession;

		return fileSession.session;
	}

	applyDeltas(changes: IModelContentChange[]) {
		changes ??= [];
		//we need only changes outside of ace editor
		const filteredChanges = changes.filter((el) => {
			//@ts-ignore
			return !(el['identifier'] && el['identifier'].major === this.changesIdentifier && el['identifier'].minor === this.changesIdentifier);
		});
		this.applyingDeltas = true;
		for (const edit of filteredChanges.reverse()) { //should it be reverse?
			const change = {
				range: toAceRange(edit.range),
				text: edit.text
			};
			this.editor?.session.replace(<Ace.Range>change.range, change.text);
		}
		this.applyingDeltas = false;
	}

	async getCompletions(editor: Ace.Editor) {
		const suggestCtx: CompletionContext = {triggerKind: CompletionTriggerKind.Invoke}; //TODO: triggerKind

		this._requestToken = new CancellationTokenSource();

		const completions = await provideSuggestionItems(
			this.languageFeaturesService.completionProvider,
			this.textModel!,
			fromAcePosition(editor.getCursorPosition()),
			CompletionOptions.default,
			suggestCtx,
			this._requestToken.token
		);
		return completions.items.map((el) => toCompletion(el.completion));
	}

	setStyle(editor: Ace.Editor) {
		//@ts-ignore
		editor.renderer['$textLayer'].dom.importCssString(`.ace_tooltip * {
    margin: 0;
    font-size: 12px;
}

.ace_tooltip code {
    font-style: italic;
    font-size: 11px;
}

.language_highlight_error {
    position: absolute;
    border-bottom: dotted 1px #e00404;
    z-index: 2000;
    border-radius: 0;
}

.language_highlight_warning {
    position: absolute;
    border-bottom: solid 1px #DDC50F;
    z-index: 2000;
    border-radius: 0;
}

.language_highlight_info {
    position: absolute;
    border-bottom: dotted 1px #999;
    z-index: 2000;
    border-radius: 0;
}

.language_highlight_text, .language_highlight_read, .language_highlight_write {
    position: absolute;
    box-sizing: border-box;
    border: solid 1px #888;
    z-index: 2000;
}

.language_highlight_write {
    border: solid 1px #F88;
}`, "linters.css");
	}
}
