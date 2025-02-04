import { Ace } from 'ace-code';
import * as events from 'events';
import { EventEmitter } from 'events';

declare abstract class FileSystemEntry$1 {
	protected fileSystemHandle: FileSystemHandle;
	protected filePath: string;
	abstract kind: FileType;
	protected constructor(fileSystemHandle: FileSystemHandle, filePath?: string);
	get path(): string;
	get name(): string;
	get leaf(): Leaf;
}
declare abstract class TabPanel {
	active: boolean;
	title: string;
	element: LayoutHTMLElement;
	parent?: TabPanelBar<TabPanel>;
	protected constructor(options: TabPanelOptions);
	activate(): void;
	deactivate(): void;
	abstract render(): any;
	abstract toJSON(): TabPanelOptions;
}
declare abstract class TabPanelBar<TabPanelType extends TabPanel> extends Toolbar {
	activeTab?: TabPanelType;
	selectedTabs: TabPanelType[];
	tabList: TabPanelType[];
	initTabList: TabPanelType[];
	tabDraggingElement?: HTMLElement;
	draggingElementIndex?: number;
	isDragging: boolean;
	scrollLeft: number;
	animationSteps: number;
	MIN_TAB_SIZE: number;
	MAX_TAB_SIZE: number;
	vX: number;
	animationTimer: any;
	animationScrollLeft: any;
	width: any;
	anchorTab: any;
	tabWidth: number;
	activeTabClicked: boolean;
	activeTabHistory: TabPanelType[];
	tabContainer: HTMLElement;
	constructor(options: any);
	isVertical(): boolean;
	getDraggingElementSize(): number;
	tabMouseDown(tab: TabPanelType, expand?: boolean, toggle?: boolean): void;
	expandSelection(tab: TabPanelType, toggle?: boolean): void;
	toggleSelection(tab: TabPanelType): void;
	addSelection(tab: TabPanelType): void;
	selectTab(tab: TabPanelType): void;
	deselectTab(tab: TabPanelType): void;
	removeSelection(tab: TabPanelType): void;
	removeSelections(): void;
	scrollTabIntoView(tab: TabPanelType): void;
	activateTab(tab: TabPanelType, content?: string | null, removeSelections?: boolean): void;
	removeTab(tab: TabPanelType): void;
	activatePrevious(index: number): void;
	addTab(tab: TabPanelType, index?: number, content?: string): TabPanelType;
	onMouseWheel: (e: any) => void;
	setScrollPosition(scrollLeft: number): void;
	animateScroll(v: number): void;
	stopScrollAnimation(): void;
	transform(el: LayoutHTMLElement, dx: number, dy: number): void;
	startTabDragging(element: HTMLElement, index: number): void;
	finishTabDragging(): void;
	toJSON(): {
		tabList: TabPanelOptions[];
		scrollLeft: number;
	};
	abstract render(): any;
	abstract configure(): any;
}
declare class DataProvider {
	root: {
		[property: string]: any;
	};
	constructor(root?: Object | Array<any>);
	setRoot(root?: Object | Array<any>);
	open(node, deep, silent);
	expand(node, deep, silent);
	close(node, deep, silent);
	collapse(node, deep, silent);
	toggleNode(node, deep, silent);
	sort(children, compare);
	setFilter(fn);
	getChildren(node);
	loadChildren;
	shouldLoadChildren(node, ch);
	hasChildren(node);
	findNodeByPath();
	getSibling(node, dir);
	getNodeAtIndex(i);
	getIndexForNode(node);
	getMinIndex(): number;
	getMaxIndex(): number;
	setOpen(node, val): boolean;
	isOpen(node): boolean;
	isVisible(node): boolean;
	isSelected(node): boolean;
	setSelected(node, val): boolean;
	isSelectable(node): boolean;
	isAncestor(node, child): boolean;
	setAttribute(node, name, value);
	getDataRange(rows, columns, callback);
	getRange(top, bottom): Ace.Range;
	getTotalHeight(top, bottom): number;
	getNodePosition(node): {
		top: number;
		height: number;
	};
	findItemAtOffset(offset, clip);
	getIconHTML(node);
	getClassName(node);
	setClass(node, name, include);
	redrawNode;
	getCaptionHTML(node);
	getContentHTML;
	getEmptyMessage(): string;
	getText(node): string;
	getRowIndent(node): number;
	hideAllNodes();
	showAllNodes();
}
declare class Popup {
	items: DropdownElement[];
	selectedItem?: string;
	parent: Dropdown;
	selectCallback: (host: any) => void;
	activeItem: any;
	element: any;
	isSubMenu: any;
	position: any;
	direction: string;
	selectedMenu: any;
	open(): void;
	build(): void;
	render(): void;
	close(): void;
	scrollIfNeeded(): void;
	onMouseMove(e: any): void;
	onClick(e: any): void;
}
declare class TabBar extends TabPanelBar<Tab> implements Widget {
	inverted: boolean;
	buttonsWidth: number;
	tabPlusButton: HTMLElement;
	additionalButtons: HTMLElement;
	freeze: boolean;
	parent: Pane;
	plusButtonWidth: number;
	containerWidth: number;
	buttons: HTMLElement[];
	setBox(x: any, y: any, w: any, h: any): void;
	onTabMouseUp: (e: any) => void;
	onTabMouseDown: (e: any) => void;
	onTabPlusClick: (e: any) => void;
	renderElement(): void;
	render(): LayoutHTMLElement;
	computeConfig(): void;
	configure(): void;
	addButton(button: HTMLElement): void;
	setButtons(buttons: HTMLElement[]): void;
	removeButtons(): void;
	clear(): void;
	remove(): void;
	onTabClick: (e: any) => void;
	closeTab(tab: Tab): void;
	activateTab(tab: Tab, content?: string | null, removeSelections?: boolean): void;
	activatePrevious(index: number): void;
}
declare class Tree implements Ace.EventEmitter<any> {
	selection: Ace.Selection;
	constructor(element: HTMLElement, cellWidth?: number, cellHeight?: number);
	setDataProvider(provider: DataProvider): void;
	redraw(): void;
	getLength(): void;
	/**
	 * @deprecated
	 * @param row
	 */
	getLine(row: number);
	getDataProvider(): DataProvider;
	/**
	 *
	 * Returns the currently highlighted selection.
	 * @returns {String} The highlighted selection
	 **/
	getSelection(): Ace.Selection;
	/**
	 * {:VirtualRenderer.onResize}
	 * @param {Boolean} force If `true`, recomputes the size, even if the height and width haven't changed
	 *
	 *
	 * @related VirtualRenderer.onResize
	 **/
	resize(force?: boolean): void;
	/**
	 * Brings the current `textInput` into focus.
	 **/
	focus(once: boolean): void;
	/**
	 * Returns `true` if the current `textInput` is in focus.
	 **/
	isFocused(): boolean;
	/**
	 * Blurs the current `textInput`.
	 **/
	blur(): void;
	/**
	 * Emitted once the editor comes into focus.
	 * @event focus
	 **/
	onFocus();
	/**
	 * Emitted once the editor has been blurred.
	 * @event blur
	 **/
	onBlur();
	onScrollTopChange();
	onScrollLeftChange();
	$onChangeClass();
	/**
	 * Emitted when the selection changes.
	 **/
	onCaretChange();
	onSelectionChange(e);
	execCommand(command, args);
	onTextInput(text);
	onCommandKey(e, hashId, keyCode);
	insertSting(str);
	setTheme(theme);
	/**
	 * Returns an object indicating the currently selected rows. The object looks like this:
	 *
	 * ```json
	 * { first: range.start.row, last: range.end.row }
	 * ```
	 *
	 * @returns {Object}
	 **/
	$getSelectedRows(): {
		first: number;
		last: number;
	};
	/**
	 * {:VirtualRenderer.getVisibleNodes}
	 * @param {Number} tolerance fraction of the node allowed to be hidden while node still considered visible (default 1/3)
	 * @returns {Array}
	 * @related VirtualRenderer.getVisibleNodes
	 **/
	getVisibleNodes(tolerance: number): any[];
	/**
	 * Indicates if the node is currently visible on the screen.
	 * @param {Object} node The node to check
	 * @param {Number} tolerance fraction of the node allowed to be hidden while node still considered visible (default 1/3)
	 *
	 * @returns {Boolean}
	 **/
	isNodeVisible(node: Object, tolerance: number): boolean;
	$moveByPage(dir, select);
	/**
	 * Selects the text from the current position of the document until where a "page down" finishes.
	 **/
	selectPageDown();
	/**
	 * Selects the text from the current position of the document until where a "page up" finishes.
	 **/
	selectPageUp();
	/**
	 * Shifts the document to wherever "page down" is, as well as moving the cursor position.
	 **/
	gotoPageDown();
	/**
	 * Shifts the document to wherever "page up" is, as well as moving the cursor position.
	 **/
	gotoPageUp();
	/**
	 * Scrolls the document to wherever "page down" is, without changing the cursor position.
	 **/
	scrollPageDown();
	/**
	 * Scrolls the document to wherever "page up" is, without changing the cursor position.
	 **/
	scrollPageUp();
	/**
	 * Scrolls to a row. If `center` is `true`, it puts the row in middle of screen (or attempts to).
	 * @param {Number} row The row to scroll to
	 * @param {Boolean} center If `true`
	 * @param {Boolean} animate If `true` animates scrolling
	 * @param {Function} callback Function to be called when the animation has finished
	 *
	 *
	 * @related VirtualRenderer.scrollToRow
	 **/
	scrollToRow(row, center, animate, callback);
	/**
	 * Attempts to center the current selection on the screen.
	 **/
	centerSelection();
	/**
	 * Gets the current position of the Caret.
	 * @returns {Object} An object that looks something like this:
	 *
	 * ```json
	 * { row: currRow, column: currCol }
	 * ```
	 *
	 * @related Selection.getCursor
	 **/
	getCursorPosition(): Ace.Position;
	/**
	 * Returns the screen position of the Caret.
	 * @returns {Number}
	 **/
	getCursorPositionScreen(): number;
	/**
	 * {:Selection.getRange}
	 * @returns {Range}
	 * @related Selection.getRange
	 **/
	getSelectionRange(): Ace.Range;
	/**
	 * Selects all the text in editor.
	 * @related Selection.selectAll
	 **/
	selectAll();
	/**
	 * {:Selection.clearSelection}
	 * @related Selection.clearSelection
	 **/
	clearSelection();
	/**
	 * Moves the Caret to the specified row and column. Note that this does not de-select the current selection.
	 * @param {Number} row The new row number
	 * @param {Number} column The new column number
	 *
	 *
	 * @related Selection.moveCaretTo
	 **/
	moveCaretTo(row: number, column: number);
	/**
	 * Moves the Caret to the position indicated by `pos.row` and `pos.column`.
	 * @param {Object} pos An object with two properties, row and column
	 *
	 *
	 * @related Selection.moveCaretToPosition
	 **/
	moveCaretToPosition(pos: Ace.Position);
	/**
	 * Moves the Caret to the specified row number, and also into the indiciated column.
	 * @param {Number} rowNumber The row number to go to
	 * @param {Number} column A column number to go to
	 * @param {Boolean} animate If `true` animates scolling
	 *
	 **/
	gotoRow(rowNumber: number, column: number, animate: boolean);
	/**
	 * Moves the Caret to the specified row and column. Note that this does de-select the current selection.
	 * @param {Number} row The new row number
	 * @param {Number} column The new column number
	 *
	 *
	 * @related Editor.moveCaretTo
	 **/
	navigateTo(row: number, column: number);
	/**
	 * Moves the Caret up in the document the specified number of times. Note that this does de-select the current selection.
	 **/
	navigateUp();
	/**
	 * Moves the Caret down in the document the specified number of times. Note that this does de-select the current selection.
	 **/
	navigateDown();
	/**
	 * Moves the Caret left in the document the specified number of times. Note that this does de-select the current selection.
	 **/
	navigateLevelUp(toggleNode: boolean);
	/**
	 * Moves the Caret right in the document the specified number of times. Note that this does de-select the current selection.
	 **/
	navigateLevelDown();
	navigateStart();
	navigateEnd();
	getFirstNode();
	getLastNode(): Object;
	$scrollIntoView(node);
	select(node);
	getCopyText(node): string;
	onPaste(node): string;
	reveal(node, animate);
	/**
	 * {:UndoManager.undo}
	 * @related UndoManager.undo
	 **/
	undo();
	/**
	 * {:UndoManager.redo}
	 * @related UndoManager.redo
	 **/
	redo();
	/**
	 * Returns `true` if the editor is set to read-only mode.
	 * @returns {Boolean}
	 **/
	getReadOnly();
	/**
	 * Cleans up the entire editor.
	 **/
	destroy();
	setHorHeadingVisible(value);
	setVerHeadingVisible(value);
	enable();
	disable();
	removeAllListeners(name?: string): void;
	removeDefaultHandler(name: string, callback: Function): void;
	setDefaultHandler(name: string, callback: Function): void;
	addEventListener<K>(name: K, callback: any, capturing: boolean | undefined): any;
	off<K>(name: K, callback: any): void;
	on<K>(name: K, callback: any, capturing?: boolean): any;
	once<K>(name: K, callback: any): void;
	removeEventListener<K>(name: K, callback: any): void;
	removeListener<K>(name: K, callback: any): void;
}
export declare abstract class Menu {
	menuManager: MenuManager;
	selectedMenu?: MenuItems;
	menuPopup?: MenuPopup;
	selectedClass: string;
	element?: LayoutHTMLElement;
	getLastOpenPopup(): any;
	getLastSelectedMenu(): any;
	closeLastMenu(): void;
	selectMenu(menu: MenuItems): void;
	unselectMenu(): void;
	openMenu(direction?: string): MenuPopup;
	closeMenu(): void;
	moveOnTarget(target: LayoutHTMLElement): void;
	abstract getMenuByPath(path: any): any;
	openMenuByPath(path: any): void;
	abstract activateMenu(): any;
}
export declare abstract class Toolbar implements Widget {
	size: number;
	direction: ToolbarDirection;
	position?: ToolbarPosition;
	element: LayoutHTMLElement;
	setBox(x: any, y: any, w: any, h: any): void;
	constructor(options?: ToolBarOptions);
	abstract remove(): any;
	abstract toJSON(): any;
	abstract render(): LayoutHTMLElement;
}
export declare class Accordion extends Box implements Widget {
	toggleBarList: HTMLElement[];
	splitterList: HTMLElement[];
	toggleBlockList: HTMLElement[];
	boxMinSize: number;
	toggleBarHeight: number;
	splitterSize: number;
	vertical: boolean;
	color: string;
	sections: AccordionSection[];
	minSize: number;
	minVerticalSize: number;
	minHorizontalSize: number;
	padding: {
		top: number;
		left: number;
		bottom: number;
		right: number;
	};
	size?: number;
	nextChangedIndexes?: number[];
	prevChangedIndexes?: number[];
	rect: [
		number,
		number,
		number,
		number
	];
	hidden: boolean;
	parent: Box;
	constructor(options: AccordionOptions);
	hasNextOpenedBlocks(index: number): boolean;
	hasPrevOpenedBlocks(index: number): boolean;
	isOpenedByIndex(index: number): boolean;
	isOpenedBlock(toggleBlock: HTMLElement): boolean;
	keepState(): void;
	dischargeState(): void;
	recalculatePreviousSectionsSize(index: number, top: number, maxChangeSize?: number): number;
	recalculateNextSectionsSize(index: number, top: number, maxChangeSize?: number): number;
	restoreChangedSizes(size: number, changedIndexes: any): number;
	expandPreviousSections(index: number, size: number): void;
	expandNextSections(index: number, size: number): void;
	applySizeToOpenedSections(size: number, openedSections: AccordionSection[]): void;
	resize(): void;
	render(): LayoutHTMLElement;
	calculateSectionsSizesPercents(): void;
	setBox(x: any, y: any, w: any, h: any): void;
	recalculateChildrenSizes(index?: number): void;
	$updateChildSize(x: any, y: any, w: any, h: any): void;
	remove(): void;
	toJSON(): {
		type: string;
		vertical: boolean;
		size: number | undefined;
		sections: any[];
	};
}
export declare class AceEditor implements LayoutEditor<Ace.EditSession> {
	editor: Ace.Editor;
	container: HTMLElement;
	tab: Tab<Ace.EditSession>;
	resize(): void;
	focus(): void;
	destroy(): void;
	constructor();
	setSession(tab: Tab<Ace.EditSession>, value?: string | null): void;
	private initTabSession;
	private getMode;
	static getSessionState(tab: Tab<Ace.EditSession>): string;
	sessionToJSON(tab: Tab<Ace.EditSession>): string;
	restoreSessionFromJson(tab: Tab<Ace.EditSession>): void;
}
export declare class AceLayout {
	box: Box;
	constructor(startBox: Box, css?: string);
}
export declare class AceTreeWrapper {
	tree: Tree;
	private model;
	element: LayoutHTMLElement;
	constructor();
	private setupAceTree;
	updateTreeData(fileTree: any): void;
	provideIcons(): void;
}
export declare class Box extends events.EventEmitter implements Widget {
	fixedSize?: number;
	vertical: boolean;
	color: string;
	isMain: boolean;
	ratio?: number;
	toolBars: {
		[position in ToolbarPosition]?: Toolbar;
	};
	padding: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	size?: number;
	sizeUnit: SizeUnit;
	minSize: number;
	minVerticalSize: number;
	minHorizontalSize: number;
	classNames: string;
	element: LayoutHTMLElement;
	fixedChild: any;
	box: [
		number,
		number,
		number,
		number
	];
	splitter: any;
	topRightPane?: Pane;
	parent?: Box;
	hidden: boolean;
	minRatio: number;
	maxRatio: number;
	isMaximized: boolean;
	0?: Box;
	1?: Box;
	static enableAnimation(): void;
	static disableAnimation(): void;
	static setGlobalCursor(value: any): void;
	constructor(options: BoxOptions);
	private $editorAdded;
	toJSON(): any;
	onMouseDown(e: any): any;
	resize(): void;
	calculateMinMaxRatio(): void;
	render(): LayoutHTMLElement;
	renderToolBarList(): void;
	addToolBar(position: ToolbarPosition, bar: Toolbar): void;
	removeToolBar(position: any): void;
	renderChildren(): void;
	renderChild(child?: Box): void;
	calculateMinSize(forceChildrenSize?: boolean): void;
	calculateRatio(): void;
	calculateChildRatio(childBox: Box, isSecond?: boolean): void;
	renderButtons(buttonList: {
		class: string;
		title: string;
		onclick: () => void;
		content: string;
	}[]): void;
	/**
	 * Sets buttons of this box top-right tabBar
	 */
	setButtons(buttons: HTMLElement[]): void;
	addButton(button: HTMLElement): void;
	/**
	 * Finds the most top-right Pane
	 */
	getTopRightPane(): Pane | undefined;
	setBox(x: number, y: number, w: number, h: number): void;
	$updateChildSize(x: any, y: any, w: any, h: any): void;
	updateToolBarSize(width: any, height: any): void;
	restore(disableAnimation?: boolean): void;
	maximize(disableAnimation?: boolean): void;
	toggleMaximize(): void;
	remove(): void;
	removeAllChildren(): void;
	removeChild(child?: Box): void;
	toggleShowHide(): void;
	hide(): void;
	show(): void;
	/**
	 *
	 * @param {Number} previousBoxIndex
	 * @param {Box} box
	 * @returns {Box}
	 */
	addChildBox(previousBoxIndex: number | Box, box: Box): Box;
	recalculateAllMinSizes(): void;
}
export declare class Button implements Widget {
	disabled?: boolean;
	value?: string;
	className: string;
	options: any;
	element: LayoutHTMLElement;
	constructor(options: ButtonOptions);
	remove(): void;
	render(): LayoutHTMLElement;
	toJSON(): void;
}
export declare class CommandManager {
	static registerCommands(commands: Ace.Command[], context?: Object): void;
}
export declare class Dropdown {
	lbl: any;
	disabled: boolean;
	items: any;
	value?: string;
	className?: string;
	width: number;
	options: any;
	element: any;
	popup: Popup;
	isPopupOpen: boolean;
	constructor(options: DropdownOptions);
	render(): any;
	onMouseDown: (e: any) => void;
	onMouseWheel: (e: any) => void;
	togglePopup(): void;
	openPopup(): void;
	closePopup(): void;
	select(value: any): void;
	setValue(value: any): void;
	updateLabel(): void;
	toJSON(): void;
}
export declare class FileSystemWeb extends EventEmitter {
	private directory;
	private get dir();
	open(): Promise<{
		nodes: Leaf[];
	} | undefined>;
	getFileTree(): Promise<{
		nodes: Leaf[];
	} | undefined>;
	openFile(treeNode: any): Promise<void>;
}
export declare class ListBox extends Box {
	private popup;
	render(): LayoutHTMLElement;
	$updateChildSize(x: any, y: any, w: any, h: any): void;
}
export declare class MenuBar extends Menu {
	selectedClass: string;
	menus: MenuItems;
	bottom: number;
	build(parent: LayoutHTMLElement): void;
	activateMenu(): void;
	inactivateMenu(): void;
	/*** event handlers ***/
	onMouseDown(e: any): void;
	moveOnTarget(target: any): void;
	onMouseMove: (e: any) => void;
	getMenuByPath(path: any): MenuItems;
}
export declare class MenuItems {
	map: {
		[part: string]: MenuItems;
	};
	path: any;
	id: any;
	label: any;
	position: number;
	hotKey: string;
	type: string;
	checked: boolean;
	disabled: boolean;
	className: string;
	exec: Function;
	element?: LayoutHTMLElement;
	buttonElement?: HTMLElement;
	$buttonElement?: HTMLElement;
}
export declare class MenuManager {
	private static _instance;
	menus: MenuItems;
	activeMenu?: MenuPopup | MenuBar;
	isActive: boolean;
	menuBar: MenuBar;
	searchBox: MenuSearchBox;
	currentHost: any;
	lastPos: Position;
	prevPos: Position;
	static getInstance(): MenuManager;
	find(path: any, item?: MenuItems): MenuItems;
	addByPath(path: any, options?: MenuOptions): void;
	getTarget(target: LayoutHTMLElement, callback?: any): LayoutHTMLElement | undefined;
	bindKeys(): void;
	build(): void;
	buildMenuBar(parent: any): void;
	openMenuByPath(path: any, position: Position): void;
	activateMenu(): void;
	inactivateMenu(): void;
	onMouseDown: (e: any) => void;
	onMouseMove: (e: any) => void;
	onWindowResize: (e: any) => void;
	onContextMenuOpen: (e: any) => void;
	addSymbolToSearchBox(symbol: string): void;
	openSearchBox(): void;
	add: (path: any, options?: MenuOptions) => void;
}
export declare class MenuPopup extends Menu {
	selectedClass: string;
	menu: MenuItems;
	position: Position;
	isSubMenu: boolean;
	direction: string;
	prevMaxHeight: any;
	parentMenu: Menu;
	inactivateMenu(): void;
	activateMenu(): void;
	open(): void;
	build(): void;
	render(): void;
	close(): void;
	scrollIfNeeded(): void;
	moveOnTarget(target: any): void;
	onMouseMove: (e: any) => void;
	onMouseUp: (e: any) => void;
	isDirectedToSubMenu(e: any): boolean;
	renderRecursive(): void;
	getMenuByPath(path: string): any;
}
export declare class MenuSearchBox {
	parentPopup?: MenuPopup;
	isOpen: boolean;
	hideFiltered: boolean;
	value: string;
	currValue: string;
	currPopupMenu?: MenuPopup;
	menuManager?: MenuManager;
	isChanged: boolean;
	searchField: any;
	suggestionPopup: any;
	selectMenu: any;
	secondarySelectMenu: any;
	element: LayoutHTMLElement;
	open(): void;
	close(): void;
	setParentPopup(parentPopup: MenuPopup): void;
	calcElementPosition(): void;
	addSymbol(symbol: string): void;
	removeSymbol(): void;
	update(): void;
	switchShowHideFiltered(): void;
	showHideMenuNode(menu: any, show: any): void;
	setPopupMenuHighlights(): void;
	setHighlights(menu: any): void;
	getTokens(string: any): any[] | undefined;
	build(): void;
}
export declare class MenuToolbar extends Toolbar {
	menuBar: MenuBar;
	render(): LayoutHTMLElement;
	remove(): void;
	toJSON(): void;
}
export declare class Pane extends Box {
	tabBar: TabBar;
	private tabEditorBoxElement;
	isButtonHost: boolean;
	editors: {
		[editorName: string]: LayoutEditor;
	};
	currentEditorType?: EditorType;
	editor?: LayoutEditor;
	constructor(options?: PaneOptions);
	toJSON(): {
		type: string;
		tabBar: {
			tabList: TabPanelOptions[];
			scrollLeft: number;
		};
	};
	render(): LayoutHTMLElement;
	acceptsTab(tab: any): boolean;
	split(far: any, vertical?: boolean): Pane;
	setButtons(buttons: HTMLElement[]): void;
	addButton(button: HTMLElement): void;
	$updateChildSize(x: any, y: any, w: any, h: any): void;
	removeButtons(): void;
	remove(): void;
	getTopRightPane(): Pane;
	private createEditor;
	private createEditorByType;
	private initEditor;
	private hidePreviousEditor;
	getEditor(editorType?: EditorType): LayoutEditor | undefined;
	getOrCreateEditor(editorType?: EditorType): LayoutEditor;
	private clearEditors;
}
export declare class Panel extends TabPanel {
	location?: string;
	panelBody: Accordion | Box;
	autoHide: boolean;
	parent: PanelBar;
	constructor(options: PanelOptions);
	activate(): void;
	deactivate(): void;
	render(): LayoutHTMLElement;
	toJSON(): PanelOptions;
	remove(): void;
}
export declare class PanelBar extends TabPanelBar<Panel> implements Widget {
	setBox(x: any, y: any, w: any, h: any): void;
	configure(): void;
	render(): LayoutHTMLElement;
	addTabList(tabList: PanelOptions[], index?: number): void;
	remove(): void;
}
export declare class PanelManager {
	private static _instance;
	private layout;
	private readonly locations;
	private constructor();
	static getInstance(options?: PanelManagerOptions): PanelManager;
	toJSON(): {
		panelBars: {};
	};
	panelBarsToJSON(): {};
	setState(state: any): void;
	activatePanel(panel: Panel): void;
	deactivatePanel(panel: Panel): void;
}
export declare class PreviewEditor implements LayoutEditor<string> {
	editor: any;
	container: HTMLElement;
	tab: Tab<string>;
	resize(): void;
	focus(): void;
	destroy(): void;
	constructor();
	setSession(tab: Tab<string>, value?: string | null): void;
	restoreSessionFromJson(tab: Tab<string>): void;
	sessionToJSON(tab: Tab<string>): string;
}
export declare class SettingsSearchBox {
	hideFiltered: boolean;
	value: string;
	currValue: string;
	prefsParentNode: LayoutHTMLElement;
	searchResultsCount: number;
	searchResults: any;
	element: any;
	searchField: any;
	constructor(prefsParentNode: LayoutHTMLElement);
	filter(): void;
	showHide(item: any, show: any): void;
	updateVisibility(item: LayoutHTMLElement): void;
	getTokens(string: any): {}[] | null;
	build(): void;
	clear(): void;
}
export declare class Switcher implements Widget {
	className?: string;
	element: LayoutHTMLElement;
	checked: boolean;
	private options;
	constructor(options: SwitcherOptions);
	render(): LayoutHTMLElement;
	toJSON(): void;
	remove(): void;
}
export declare class Tab<SessionType extends EditSession = EditSession> extends TabPanel implements Widget {
	session: SessionType;
	sessionValue?: string;
	contextMenu: string;
	tabIcon: string;
	path: string;
	preview: boolean;
	parent?: TabBar;
	$caption: string;
	editorType: EditorType;
	constructor(options: TabOptions);
	toJSON(): TabOptions;
	activate(content?: string | null): void;
	activatePane(): void;
	remove(): void;
	set caption(value: string);
	get caption(): string;
	render(): LayoutHTMLElement;
	setTitle(title: string): void;
	get isActive(): boolean;
	get editor(): LayoutEditor<SessionType> | undefined;
}
export declare class TabManager {
	private static _instance;
	containers: {
		"main": Box;
		[containerName: string]: Box;
	};
	tabs: {
		[path: string]: Tab;
	};
	previewTab?: Tab;
	activePane?: Pane;
	fileSystem?: FileSystemWeb;
	static getInstance(options?: TabManagerOptions): TabManager;
	private constructor();
	private initFileSystem;
	commandsInit(): void;
	toJSON(): {
		[k: string]: any;
	};
	setChildBoxData(box: Box, boxData: any, index: number): void;
	setBoxData(box: Box | Pane, boxData: any): void;
	setState(state: {}): void;
	setContainerState(container: string, state: {}): void;
	private $setBoxState;
	clear(): void;
	getPanes(): void;
	getTabs(): {
		[path: string]: Tab<EditSession>;
	};
	get activeTab(): Tab | undefined;
	open<SessionType extends EditSession>(tabOptions: TabOptions, container?: string, fileContent?: string): Tab<SessionType>;
	getContainerPane(container: string): Pane;
	clearPreviewStatus(tab: Tab): void;
	get newTabPath(): string;
	addNewTab(pane: Pane, options?: TabOptions): Tab<EditSession>;
	removeTab(tab: Tab): void;
	loadFile(tab: Tab, fileContent?: string | null): void;
	navigateToTab(index: number, tab?: Tab, tabs?: Tab[]): void;
	saveTo(storage: {}): void;
	restoreFrom(storage: {}): void;
	getTab(path: string): Tab | undefined;
}
export declare enum EditorType {
	"ace" = "ace",
	"preview" = "preview"
}
export declare enum SizeUnit {
	"px" = 0,
	"percent" = 1
}
export declare namespace dom {
	var buildDom: (arr: any, parent?: HTMLElement, refs?: any) => any;
	var getDocumentHead: (doc: any) => any;
	var createElement: (tag: any, ns?: string) => any;
	var removeChildren: (element: any) => void;
	var createTextNode: (textContent: any, element: any) => any;
	var createFragment: (element: any) => any;
	var hasCssClass: (el: any, name: any) => boolean;
	var addCssClass: (el: any, name: any) => void;
	var removeCssClass: (el: any, name: any) => void;
	var toggleCssClass: (el: any, name: any) => boolean;
	var setCssClass: (node: any, className: any, include: any) => void;
	var hasCssString: (id: any, doc: any) => true | undefined;
	var removeElementById: (id: any, doc: any) => void;
	var useStrictCSP: (value: any) => void;
	function importCssString(cssText: any, id: any, target?: any): number | null | undefined;
	var importCssStylsheet: (uri: any, doc: any) => void;
	var scrollbarWidth: (document: any) => number;
	var computedStyle: (element: any, style: any) => CSSStyleDeclaration;
	var setStyle: (styles: any, property: any, value: any) => void;
	var HAS_CSS_ANIMATION: boolean;
	var HAS_CSS_TRANSFORMS: boolean;
	var HI_DPI: boolean;
	var translate: any;
}
export declare type FileType = "directory" | "file";
export interface AccordionOptions {
	vertical?: boolean;
	color?: string;
	sections: AccordionSection[];
	minSize?: number;
	minVerticalSize?: any;
	minHorizontalSize?: any;
	size?: number;
}
export interface AccordionSection {
	title: string;
	box: Box;
	currentSize?: number;
	previousSize?: number;
	savedSize?: number;
	sizePercent?: number;
}
export interface BoxOptions {
	fixedSize?: number;
	hidden?: boolean;
	toolBars?: {
		[position in ToolbarPosition]?: Toolbar;
	};
	ratio?: number;
	isMain?: boolean;
	vertical?: boolean;
	splitter?: boolean;
	color?: string;
	minSize?: number;
	minVerticalSize?: any;
	minHorizontalSize?: any;
	size?: number;
	sizeUnit?: SizeUnit;
	classNames?: string;
	0?: Box;
	1?: Box;
}
export interface ButtonOptions {
	disabled?: boolean;
	value?: string;
	className?: string;
}
export interface DropdownElement {
	hotKey: any | string;
	value: string;
	disabled: any;
	map: any;
	type: string;
	checked: any;
	caption: any;
	position: number;
}
export interface DropdownOptions {
	disabled?: boolean;
	items: any;
	value?: string;
	className?: string;
	width: number;
}
export interface LayoutEditor<SessionType extends EditSession = EditSession> {
	container: HTMLElement;
	setSession(tab: Tab, value?: string | null);
	tab: Tab;
	resize();
	focus();
	destroy();
	sessionToJSON(tab: Tab<SessionType>);
	restoreSessionFromJson(tab: Tab<SessionType>);
}
export interface LayoutHTMLElement extends HTMLElement {
	dx?: number;
	dy?: number;
	$host: any; //TODO:
	parentElement: LayoutHTMLElement;
}
export interface MenuOptions {
	exec?: any;
	className?: string;
	disabled?: boolean;
	checked?: boolean;
	type?: string;
	hotKey?: any;
	label?: string;
	position?: number;
}
export interface PaneOptions extends BoxOptions {
	tabList?: Tab[];
}
/**
 * Interface for classes that represent location of the panel on layout.
 *
 */
export interface PanelLocation {
	parent: Box;
	index: number;
	size: number;
	box?: Box;
}
export interface PanelManagerOptions {
	locations: LocationList;
	layout: Box;
}
export interface PanelOptions extends TabPanelOptions {
	panelBody: Accordion | Box;
	location?: string;
	autoHide?: boolean;
}
export interface Position {
	x: number;
	y: number;
}
export interface SwitcherOptions {
	checked?: boolean;
	className?: string;
}
export interface TabManagerOptions {
	containers: {
		"main": Box;
		[containerName: string]: Box;
	};
	fileSystem?: FileSystemWeb;
}
export interface TabOptions extends TabPanelOptions {
	preview?: boolean;
	path: string;
	editorType?: EditorType;
}
export interface TabPanelOptions {
	title: string;
	active?: boolean;
	icon?: string;
}
export interface ToolBarOptions {
	size?: number;
	direction?: ToolbarDirection;
	position?: ToolbarPosition;
}
/**
 * Interface for classes that represent a widgets.
 *
 */
export interface Widget {
	render();
	remove();
	toJSON();
}
export type EditSession = Ace.EditSession | String;
export type Leaf = {
	kind: FileType;
	name: string;
	path: string;
	children?: Leaf[];
	self?: FileSystemEntry$1;
};
export type LocationList = {
	[location in ToolbarPosition]?: PanelLocation;
};
export type ToolbarDirection = "vertical" | "horizontal";
export type ToolbarPosition = "right" | "left" | "top" | "bottom";

export {};
