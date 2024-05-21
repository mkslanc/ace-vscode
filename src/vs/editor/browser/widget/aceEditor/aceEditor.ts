import {ITextModel} from 'vs/editor/common/model';
import {
	Editor,
	VirtualRenderer,
	Ace,
	createEditSession,
} from 'vs/editor/browser/widget/aceEditor/ace-editor';
import {fromAceDelta, fromAcePosition, toAceRange, toCompletion} from 'vs/editor/browser/widget/aceEditor/converters';
import {mapToAceMode} from 'vs/editor/browser/widget/aceEditor/modesMapper';
import IModelContentChange = monaco.editor.IModelContentChange;
import {ViewModel} from 'vs/editor/common/viewModel/viewModelImpl';
import {ISelection, Selection} from 'vs/editor/common/core/selection';
import {ILanguageFeaturesService} from 'vs/editor/common/services/languageFeatures';
import {CompletionOptions, provideSuggestionItems} from 'vs/editor/contrib/suggest/browser/suggest';
import {CompletionContext, CompletionTriggerKind} from 'vs/editor/common/languages';
import {CancellationTokenSource} from 'vs/base/common/cancellation';

//TODO: other event types
//TODO: single line editor
//TODO: keybindings
//TODO: disposal
//TODO: ace extensions
export class AceEditor {
	private textModel?: ITextModel;
	public editor?: Ace.Editor;
	private domElement: HTMLElement;
	private sessions: { [id: string]: Ace.EditSession } = {};
	private changesIdentifier: number;
	private viewModel?: ViewModel;
	private applyingDeltas: boolean;
	private languageFeaturesService: ILanguageFeaturesService;
	private _requestToken?: CancellationTokenSource;

	constructor(domElement: HTMLElement, languageFeaturesService: ILanguageFeaturesService) {
		this.domElement = domElement;
		this.changesIdentifier = 12345;
		this.applyingDeltas = false;
		this.languageFeaturesService = languageFeaturesService;
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
			customScrollbar: true
		});
		this.registerCompleters(editor);
		return editor;
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
		const id = this.textModel?.id || '';
		if (!this.sessions[id]) {
			this.createSession();
		}
		this.editor?.setSession(this.sessions[id]);
	}

	createSession() {
		const id = this.textModel?.id || '';
		this.sessions[id] = createEditSession(this.textModel?.getValue() || '', mapToAceMode(this.textModel!.getLanguageId()));
		this.sessions[id].doc.on('change', this.$changeListener, true);
		this.sessions[id].selection.on('changeSelection', this.$selectionChange);
		this.sessions[id].setNewLineMode(this.getNewLineMode(this.textModel?.getEOL()));

		return this.sessions[id];
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
}
