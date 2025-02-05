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
export interface ButtonOptions {
	disabled?: boolean;
	value?: string;
	className?: string;
}
export interface LayoutHTMLElement extends HTMLElement {
	dx?: number;
	dy?: number;
	$host: any; //TODO:
	parentElement: LayoutHTMLElement;
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

export {};
