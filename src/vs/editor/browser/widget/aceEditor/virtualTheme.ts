import {IColorTheme} from 'vs/platform/theme/common/themeService';
import {ColorThemeData} from 'vs/workbench/services/themes/common/colorThemeData';
import {ITokenColorizationSetting} from 'vs/workbench/services/textMate/common/TMHelper';

export class VirtualTheme {
	isDark: boolean;
	cssClass: string;
	cssText: string;
	$id = 'ace/theme/virtual';

	constructor(isDark: boolean, cssClass: string, cssText: string, id: string) {
		this.isDark = isDark;
		this.cssClass = cssClass;
		this.cssText = cssText;
		this.$id = id;
	}
}

export class ThemeConverter {
	private _unsupportedScopes: { [key: string]: number } = {};

	private _supportedScopes: { [key: string]: string } = {
		'keyword': 'keyword',
		'keyword.operator': 'keyword.operator',
		'keyword.other.unit': 'keyword.other.unit',

		'constant': 'constant',
		'constant.language': 'constant.language',
		'constant.library': 'constant.library',
		'constant.numeric': 'constant.numeric',
		'constant.character': 'constant.character',
		'constant.character.escape': 'constant.character.escape',
		'constant.character.entity': 'constant.character.entity',
		'constant.other': 'constant.other',

		'support': 'support',
		'support.function': 'support.function',
		'support.function.dom': 'support.function.dom',
		'support.function.firebug': 'support.firebug',
		'support.function.constant': 'support.function.constant',
		'support.constant': 'support.constant',
		'support.constant.property-value': 'support.constant.property-value',
		'support.class': 'support.class',
		'support.type': 'support.type',
		'support.other': 'support.other',

		'function': 'function',
		'function.buildin': 'function.buildin',

		'storage': 'storage',
		'storage.type': 'storage.type',

		'invalid': 'invalid',
		'invalid.illegal': 'invalid.illegal',
		'invalid.deprecated': 'invalid.deprecated',

		'string': 'string',
		'string.regexp': 'string.regexp',

		'comment': 'comment',
		'comment.documentation': 'comment.doc',
		'comment.documentation.tag': 'comment.doc.tag',

		'variable': 'variable',
		'variable.language': 'variable.language',
		'variable.parameter': 'variable.parameter',

		'meta': 'meta',
		'meta.tag.sgml.doctype': 'xml-pe',
		'meta.tag': 'meta.tag',
		'meta.selector': 'meta.selector',

		'entity.other.attribute-name': 'entity.other.attribute-name',
		'entity.name.function': 'entity.name.function',
		'entity.name': 'entity.name',
		'entity.name.tag': 'entity.name.tag',

		'markup.heading': 'markup.heading',
		'markup.heading.1': 'markup.heading.1',
		'markup.heading.2': 'markup.heading.2',
		'markup.heading.3': 'markup.heading.3',
		'markup.heading.4': 'markup.heading.4',
		'markup.heading.5': 'markup.heading.5',
		'markup.heading.6': 'markup.heading.6',
		'markup.list': 'markup.list',

		'collab.user1': 'collab.user1'
	};

	private _fallbackScopes: { [key: string]: string } = {
		'keyword': 'meta',
		'support.type': 'storage.type',
		'variable': 'entity.name.function'
	};

	// Taken from .ace-tm
	private _defaultGlobals: { [key: string]: string } = {
		'printMargin': '#e8e8e8',
		'background': '#ffffff',
		'foreground': '#000000',
		'gutter': '#f0f0f0',
		'selection': 'rgb(181, 213, 255)',
		'step': 'rgb(198, 219, 174)',
		'bracketBorder': 'rgb(192, 192, 192)',
		'bracketBackground': 'none',
		'active_line': 'none', //'rgba(0, 0, 0, 0.07)',
		'active_line_number': 'inherit',
		'active_line_border': 'none',
		'cursor': '#000000',
		'cursorBackground': 'none',
		'invisible': 'rgb(191, 191, 191)',
		'fold': '#6b72e6',
		'widgetBorder': 'lightgray',
		'editorErrorColor': '#e00404',
		'editorErrorBackground': 'none',
		'editorWarningColor': '#DDC50F',
		'editorWarningBackground': 'none',
		'editorInfoColor': '#999',
		'editorInfoBackground': 'none',
		'editorWidgetBorder': 'gray'
	};

	public static convertTheme(themeData: IColorTheme) {
		console.log(themeData);
		if (!(themeData instanceof ColorThemeData)) {
			return;
		}
		const ts = new ThemeConverter();
		const styles = ts._extractStyles(themeData);

		const label = themeData.id.replace(/ /g, '');
		styles.cssClass = ts._hyphenate(label);
		var css = ts._fillTemplate(template, styles);
		css = css.replace(/[^{}]+{\s*}/g, '');

		for (let i in ts._supportedScopes) {
			if (!styles[i]) {
				continue;
			}
			css += '.' + styles.cssClass + ' ' +
				i.replace(/^|\./g, '.ace_') + '{' + styles[i] + '}';
		}

		const isDark = themeData.type === 'dark' || themeData.type === 'hcDark';
		return new VirtualTheme(isDark, styles.cssClass, css, label);
	}

	private _hyphenate(str: string) {
		return str.replace(/([A-Z])/g, '-$1').replace(/_/g, '-').toLowerCase();
	}

	private _extractStyles(theme: ColorThemeData) {

		const settings = theme.tokenColors;
		const globalSettings = settings[0].settings;
		const colors: { [styleName: string]: string } = {
			'printMargin': this._defaultGlobals.printMargin,
			'background': this._parseColor(globalSettings.background) || this._defaultGlobals.background,
			'foreground': this._parseColor(globalSettings.foreground) || this._defaultGlobals.foreground,
			'gutter': this._defaultGlobals.gutter,
			'selection': theme.getColor('editor.selectionBackground')?.toString() || this._defaultGlobals.selection,
			"step": this._defaultGlobals.step,
			'bracketBorder': theme.getColor('editorBracketMatch.border')?.toString() || this._defaultGlobals.bracketBorder,
			'bracketBackground': theme.getColor('editorBracketMatch.background')?.toString() || this._defaultGlobals.bracketBackground,
			'active_line': theme.getColor('editor.lineHighlightBackground')?.toString() || this._defaultGlobals.active_line,
			'active_line_number': theme.getColor('editorLineNumber.activeForeground')?.toString() || this._defaultGlobals.active_line,
			'active_line_border': theme.getColor('editor.lineHighlightBorder')?.toString() || this._defaultGlobals.active_line_border,
			'indent_guide': theme.getColor('editorIndentGuide.background1')?.toString() || this._defaultGlobals.active_line,
			'active_indent_guide': theme.getColor('editorIndentGuide.activeBackground1')?.toString() || this._defaultGlobals.active_line,
			'cursor': theme.getColor('editorCursor.foreground')?.toString() || this._defaultGlobals.cursor,
			'cursorBackground': theme.getColor('editorCursor.background')?.toString() || this._defaultGlobals.cursorBackground,
			'widgetBorder': theme.getColor('editorWidget.border')?.toString() || this._defaultGlobals.widgetBorder,
			'editorErrorColor': theme.getColor('editorError.foreground')?.toString() || this._defaultGlobals.editorErrorColor,
			'editorErrorBackground': theme.getColor('editorError.background')?.toString() || this._defaultGlobals.editorErrorBackground,
			'editorWarningColor': theme.getColor('editorWarning.foreground')?.toString() || this._defaultGlobals.editorWarningColor,
			'editorWarningBackground': theme.getColor('editorWarning.background')?.toString() || this._defaultGlobals.editorWarningBackground,
			'editorInfoColor': theme.getColor('editorInfo.foreground')?.toString() || this._defaultGlobals.editorInfoColor,
			'editorInfoBackground': theme.getColor('editorInfo.background')?.toString() || this._defaultGlobals.editorInfoBackground,
			'editorWidgetBackground': theme.getColor('editorWidget.background')?.toString() || this._parseColor(globalSettings.background) || this._defaultGlobals.background,
			'editorWidgetColor': theme.getColor('editorWidget.foreground')?.toString() || this._parseColor(globalSettings.foreground) || this._defaultGlobals.foreground,
			'editorWidgetBorder': theme.getColor('editorWidget.foreground')?.toString() || this._defaultGlobals.editorWidgetBorder,
			'editorAutocompleteWidgetColor': theme.getColor('editorSuggestWidget.foreground')?.toString() || this._defaultGlobals.foreground,
			'editorAutocompleteWidgetBackground': theme.getColor('editorSuggestWidget.background')?.toString() || this._defaultGlobals.background,
			'editorAutocompleteWidgetBorder': theme.getColor('editorSuggestWidget.border')?.toString() || this._defaultGlobals.editorWidgetBorder,
			'editorAutocompleteWidgetSelectedBackground': theme.getColor('editorSuggestWidget.selectedBackground')?.toString() || this._defaultGlobals.selection,
			'editorAutocompleteWidgetSelectedForeground': theme.getColor('editorSuggestWidget.selectedForeground')?.toString() || this._defaultGlobals.selection,
			"invisible": "color: " + (/*parseColor(globalSettings.invisibles) || */this._defaultGlobals.invisible) + ";"
		};

		for (let i = 1; i < settings.length; i++) {
			const element = settings[i];
			if (!element.scope || !element.settings) {
				continue;
			}
			// scopes are already normalized in the theme service
			let scopes: string[] = [];
			if (Array.isArray(element.scope)) {
				scopes = element.scope;
			} else {
				scopes.push(element.scope);
			}

			for (let j = 0; j < scopes.length; j++) {
				const scope = scopes[j];
				const style = this._parseStyles(element.settings);

				var aceScope = this._supportedScopes[scope];
				if (aceScope) {
					colors[aceScope] = style;
				} else if (style) {
					this._unsupportedScopes[scope] = (this._unsupportedScopes[scope] || 0) + 1;
				}
			}
		}

		for (let i in this._fallbackScopes) {
			if (!colors[i]) {
				colors[i] = colors[this._fallbackScopes[i]];
			}
		}

		if (!colors.fold) {
			const foldSource = colors['entity.name.function'] || colors.keyword;
			if (foldSource) {
				const match = foldSource?.match(/:([^;]+)/);
				colors.fold = match ? match[1] : '';
			} else {
				colors.fold = this._defaultGlobals.fold;
			}
		}

		colors.gutterBg = theme.getColor('editorGutter.background')?.toString() || colors.background;
		colors.gutterFg = theme.getColor('editorLineNumber.foreground')?.toString() || this._mix(colors.foreground, colors.background, 0.5);
		colors.active_line_border = colors.active_line_border === this._defaultGlobals.active_line_border ? colors.active_line_border : '2px solid ' + colors.active_line_border;
		if (!colors.selected_word_highlight) {
			colors.selected_word_highlight = 'border: 1px solid ' + colors.selection + ';';
		}

		return colors;
	}

	private _parseStyles(styles: ITokenColorizationSetting) {
		var css = [];
		var fontStyle = styles.fontStyle || '';
		if (fontStyle.indexOf('underline') !== -1) {
			css.push('text-decoration:underline;');
		}
		if (fontStyle.indexOf('italic') !== -1) {
			css.push('font-style:italic;');
		}

		if (styles.foreground) {
			css.push('color:' + this._parseColor(styles.foreground) + ';');
		}
		if (styles.background) {
			css.push('background-color:' + this._parseColor(styles.background) + ';');
		}

		return css.join('\n');
	}

	private _mix(c1: string, c2: string, a1: number, a2?: number) {
		const rgbColor1 = this._rgbColor(c1);
		const rgbColor2 = this._rgbColor(c2);
		if (!rgbColor1 || !rgbColor2) {
			return c1 || c2 || '#fff';
		}
		if (a2 === undefined) {
			a2 = 1 - a1;
		}
		return 'rgb(' + [
			Math.round(a1 * rgbColor1[0] + a2 * rgbColor2[0]),
			Math.round(a1 * rgbColor1[1] + a2 * rgbColor2[1]),
			Math.round(a1 * rgbColor1[2] + a2 * rgbColor2[2])
		].join(',') + ')';
	}

	private _rgbColor(color: string): number[] | null {
		if (color[0] === '#') {
			const hexColors = color.match(/^#(..)(..)(..)/);
			return hexColors ? hexColors.slice(1).map(function (c) {
				return parseInt(c, 16);
			}) : null;
		} else {
			const rgba = color.match(/\(([^,]+),([^,]+),([^,]+)/);

			return rgba ? rgba.slice(1).map(function (c) {
				return parseInt(c, 10);
			}) : null;
		}
	}

	private _parseColor(color?: string) {
		if (!color || !color.length) {
			return null;
		}
		if (color.length === 4) {
			color = color.replace(/[a-fA-F\d]/g, '$&$&');
		}
		if (color.length === 7) {
			return color;
		} else {
			const colorMatches = color.match(/^#(..)(..)(..)(..)$/);
			if (!colorMatches) {
				console.error('can\'t parse color', color);
				return;
			}
			const rgba = colorMatches.slice(1).map(function (c) {
				return parseInt(c, 16);
			});

			//@ts-expect-error
			rgba[3] = (rgba[3] / 0xFF).toPrecision(2);
			return 'rgba(' + rgba.join(', ') + ')';
		}
	}

	private _fillTemplate(template: string, replacements: { [styleName: string]: string }) {
		return template.replace(/%(.+?)%/g, function (str, m) {
			return replacements[m] || '';
		});
	}

}


const template =
	`.%cssClass% .ace_gutter {
  background: %gutterBg%;
  color: %gutterFg%;
}

.%cssClass% .ace_print-margin {
  width: 1px;
  background: %printMargin%;
}

.%cssClass% {
  background-color: %background%;
  color: %foreground%;
}

.%cssClass% .ace_cursor {
  color: %cursor%;
  background: %cursorBackground%;
}

.%cssClass% .ace_marker-layer .ace_selection {
  background: %selection%;
}

.%cssClass%.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px %background%;
  border-radius: 2px;
}

.%cssClass% .ace_marker-layer .ace_step {
  background: %step%;
}

.%cssClass% .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid %bracketBorder%;
  background: %bracketBackground%;
}

.%cssClass% .ace_marker-layer .ace_active-line {
  background: %active_line%;
  border: %active_line_border%;
}

.%cssClass% .ace_gutter-active-line {
  background-color: %active_line%;
  color: %active_line_number%
}

.%cssClass% .ace_marker-layer .ace_selected-word {
  %selected_word_highlight%
}

.%cssClass% .ace_fold {
    background-color: %fold%;
    border-color: %foreground%;
}

.%cssClass% .ace_indent-guide {
	box-shadow: 1px 0 0 0 %indent_guide%;
}

.%cssClass% .ace_indent-guide-active {
	box-shadow: 1px 0 0 0 %active_indent_guide%;
}

.%cssClass%.ace_editor.ace_autocomplete {
    width: 300px;
    z-index: 200000;
    border: 1px %editorAutocompleteWidgetBorder% solid!important;
    position: fixed;
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    line-height: 1.4;
    background: %editorAutocompleteWidgetBackground%!important;
    color: %editorAutocompleteWidgetColor% !important;
}

.%cssClass%.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: %editorAutocompleteWidgetSelectedBackground%!important;
    color: %editorAutocompleteWidgetSelectedForeground%!important;
}

.ace_tooltip.%cssClass% {
    background-color: %editorWidgetBackground% !important;
    color: %editorWidgetColor% !important;
    border: 1px solid %editorWidgetBorder%
}

.%cssClass% .language_highlight_error {
    border-bottom: dotted 1px %editorErrorColor%;
    background: %editorErrorBackground%;
}

.%cssClass% .language_highlight_warning {
    border-bottom: solid 1px %editorWarningColor%;
    background: %editorWarningBackground%;
}

.%cssClass% .language_highlight_info {
    border-bottom: dotted 1px %editorInfoColor%;
    background: %editorInfoBackground%;
}
`;
//TODO: editorGutter.modifiedBackground, editorGutter.addedBackground, editorGutter.deletedBackground
