import { IComponentProps } from ".";
import VirtualDomObject, { IVirtualDomObjects } from "./VirtualDom";
//import { createHTMLElementFromVirtualDom } from "./CreateElement";


class Component {

	private _props: IComponentProps = {};
	private _children: IVirtualDomObjects = [];
	private virtualDomElements: IVirtualDomObjects = [];
	//@ts-ignore
	constructor(props: IComponentProps) {

	}

	public set props(props: IComponentProps) {
		this._props = props;
	}

	public get props(): IComponentProps {
		return this._props;
	}

	public set children(children: IVirtualDomObjects) {
		this._children = children;
	}

	public get children(): IVirtualDomObjects {
		return this._children;
	}

	public getVirtualDomElements(): IVirtualDomObjects {
		return this.virtualDomElements;
	}

	public async runLifeCycleStart() {
		await this.componentBeforeRender();
		await this.componentRender();
		await this.componentAfterRender();
	}

	private async componentBeforeRender() {
		await this.onBeforeRender();
	}

	private async componentRender() {
		let render = await this.render();
		
		if(render instanceof Array) {
			this.virtualDomElements.push(...(render as IVirtualDomObjects));
		} else {
			this.virtualDomElements.push(render as VirtualDomObject);
		}

		return render;
	}

	private async componentAfterRender() {
		await this.onAfterRender();
	}

	/*
	private async componentBeforeUpdate() {

	}

	private async componentUpdate() {

	}

	private async componentAfterUpdate() {

	}

	private async componentBeforeDestroy() {

	}

	private async componentDestroy() {

	}

	private async componentAfterDestroy() {

	}*/

	public async onBeforeRender() {

	}

	public async render(): Promise<JSX.Element | JSX.Element[] | null> {
		return null;
	}

	public async onAfterRender() {

	}

	public async onBeforeUpdate() {

	}

	public async onUpdate() {

	}

	public async onAfterUpdate() {

	}

	public async onBeforeDestroy() {

	}

	public async onDestroy() {

	}

	public async onAfterDestroy() {

	}

	public setProps(props: IComponentProps) {
		this.props = props;
	}

	public setChildren(children: IVirtualDomObjects) {
		this.children = children;
	}

	public getElement() {
		let fragment = document.createDocumentFragment();
		for (const virtualDomElement of this.virtualDomElements) {
			fragment.appendChild(virtualDomElement.htmlElement);
		}

		return fragment;
	}
}

export default Component;