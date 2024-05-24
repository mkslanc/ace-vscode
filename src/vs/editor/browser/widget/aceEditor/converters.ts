import IRange = monaco.IRange;
import {Ace} from './ace-editor';
import {IIdentifiedSingleEditOperation} from 'vs/editor/common/model';
import {Position} from 'vs/editor/common/core/position';
import type {CompletionItem, CompletionItemRanges} from 'vs/editor/common/languages';
import {IMarker, MarkerSeverity} from 'vs/platform/markers/common/markers';

export function toAceRange(range: IRange): Ace.IRange {
	return {
		start: {
			row: range.startLineNumber - 1,
			column: range.startColumn - 1
		},
		end: {
			row: range.endLineNumber - 1,
			column: range.endColumn - 1
		}

	};
}

export function fromAceRange(range: Ace.IRange): IRange {
	return {
		startLineNumber: range.start.row + 1,
		startColumn: range.start.column + 1,
		endLineNumber: range.end.row + 1,
		endColumn: range.end.column + 1
	};
}

export function fromAcePosition(position: Ace.Position): Position {
	return new Position(position.row + 1, position.column + 1);
}

export function fromAceDelta(delta: Ace.Delta, eol: string, aceIdentifier: number): IIdentifiedSingleEditOperation {
	const text = delta.lines.length > 1 ? delta.lines.join(eol) : delta.lines[0];
	return {
		range:
			delta.action === 'insert'
				? fromAceRange({start: delta.start, end: delta.start})
				: fromAceRange({start: delta.start, end: delta.end}),
		text: delta.action === 'insert' ? text : '',
		identifier : {
			major: aceIdentifier,
			minor: aceIdentifier
		}
	};
}

export function toCompletion(item: CompletionItem) {
	const itemKind = item.kind;
	//@ts-ignore
	const kind = itemKind ? Object.keys(CompletionItemKind)[Object.values(CompletionItemKind).indexOf(itemKind)] : undefined;
	const text = item.insertText ?? item.label;
	//const command = (item.command?.title === 'editor.action.triggerSuggest') ? 'startAutocomplete' : undefined; TODO
	const range = item.range ? getTextEditRange(item.range) : undefined;
	const completion: any = {
		meta: kind,
		caption: typeof item.label === 'string' ? item.label : item.label.label,
		range,
		item,
		//documentation: item.documentation,
		triggerCharacters: item.commitCharacters
	};

	if (itemKind === 27) {
		completion['snippet'] = text;
	} else {
		completion['value'] = text ?? '';
	}
	return completion;
}

export function getTextEditRange(textEdit: IRange | CompletionItemRanges): Ace.IRange | undefined {
	if ('insert' in textEdit && 'replace' in textEdit) {
		const mergedRanges = mergeRanges([toAceRange(textEdit.insert), toAceRange(textEdit.replace)]);
		return mergedRanges[0];
	} else {
		return toAceRange((textEdit as IRange));
	}
}

export function mergeRanges(ranges: Ace.IRange[]) {
	var list = ranges;

	list = list.sort(function (a, b) {
		return comparePoints(a.start, b.start);
	});

	var next = list[0], range;
	for (var i = 1; i < list.length; i++) {
		range = next;
		next = list[i];
		var cmp = comparePoints(range.end, next.start);
		if (cmp < 0) continue;

		if (cmp == 0 && !isEmptyRange(range) && !isEmptyRange(next)) continue;

		if (comparePoints(range.end, next.end) < 0) {
			range.end.row = next.end.row;
			range.end.column = next.end.column;
		}

		list.splice(i, 1);
		next = range;
		i--;
	}

	return list;
}

function comparePoints(p1: Ace.Point, p2: Ace.Point) {
	return p1.row - p2.row || p1.column - p2.column;
}

function isEmptyRange(range: Ace.IRange) {
	return (range.start.row === range.end.row && range.start.column === range.end.column);
}

export function toAnnotations(diagnostics: IMarker[]): Ace.Annotation[] {
	return diagnostics?.map((el) => {
		return {
			row: el.startLineNumber - 1,
			column: el.startColumn - 1,
			text: el.message,
			type: toAceErrorType(el.severity)
		};
	});
}

export function toAceErrorType(severity: MarkerSeverity) {
	return severity === 8 ? 'error' : severity === 4 ? 'warning' : 'info';
}

export function toMarkerGroupItemDiagnostics(range: Ace.Range, severity: MarkerSeverity, tooltipText?: string): Ace.MarkerGroupItem {
	const errorType = toAceErrorType(severity);
	const className = `language_highlight_${errorType}`;
	const markerGroupItem: Ace.MarkerGroupItem = {
		range: range,
		className: className
	};
	if (tooltipText) {
		markerGroupItem.tooltipText = tooltipText;
	}
	return markerGroupItem;
}

enum CompletionItemKind {
	Method,
	Function,
	Constructor,
	Field,
	Variable,
	Class,
	Struct,
	Interface,
	Module,
	Property,
	Event,
	Operator,
	Unit,
	Value,
	Constant,
	Enum,
	EnumMember,
	Keyword,
	Text,
	Color,
	File,
	Reference,
	Customcolor,
	Folder,
	TypeParameter,
	User,
	Issue,
	Snippet, // <- highest value (used for compare!)
}
