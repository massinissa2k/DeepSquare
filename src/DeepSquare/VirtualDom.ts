import { IComponentClass, IComponentProps } from ".";
import PropsManager from "./PropsManager";
import Component from "./Component";

type TIncrementalObjectID = number;
let incrementalObjectID: TIncrementalObjectID = 0;

export default class VirtualDomObject {

	public readonly ID = ++incrementalObjectID;
	private _component: Component;
	//private _htmlElement: HTMLElement | Comment | DocumentFragment = document.createComment("_");
	private _htmlElement: Element;
	private _type: string | IComponentClass;
	private _props: IComponentProps;
	private _children: IVirtualDomObjects = [];
	private _parent: Component | HTMLElement;

	constructor(type: IComponentClass | string, props: IComponentProps, children: IVirtualDomObjects) {
		//this.htmlElement.textContent = this.ID.toString();
		this._props = new PropsManager();
		this.props = props;
		this.children.push(...children);
		this.type = type;
		this.init();
	}

	public get props() {
		return this._props;
	}

	public set props(_props) {
		Object.assign(this._props, _props);
	}

	public get type() {
		return this._type;
	}

	public set type(_type) {
		if (!this._type) {
			this._type = _type;

			return;
		}

		throw `type: ${_type} in VirtualDomObject can't e changed`;
	}

	public get component() {
		return this._component;
	}

	public set component(_component) {
		this._component = _component;
	}

	public get htmlElement() {
		return this._htmlElement;
	}

	public set htmlElement(_htmlElement) {
		/*let oldHtmlElement = this._htmlElement;
		let parentElement = oldHtmlElement.parentElement;

		if ( parentElement && _htmlElement !== this._htmlElement) {
			parentElement.replaceChild(_htmlElement, this._htmlElement);
		}*/
		
		/*console.log(this.ID);
		if(this.ID === 1) {
			console.log(this._htmlElement, _htmlElement);
		}*/
		this._htmlElement = _htmlElement;
	}

	public get children() {
		return this._children;
	}

	public set children(_children) {
		this._children = _children;
	}

	public get parent() {
		return this._parent;
	}

	public set parent(_parent) {
		this._parent = _parent;
	}

	/*private appendChildren() {
		let fragment = document.createDocumentFragment();

		for (const child of this.children) {

			let elem: HTMLElement | Comment | DocumentFragment;

			if (child instanceof VirtualDomObject) {
				elem = child.htmlElement;
			} else {
				elem = document.createTextNode(child);
			}

			fragment.appendChild(elem);
		}

		if(this.htmlElement.nodeType !== this.htmlElement.COMMENT_NODE) {
			this.htmlElement.appendChild(fragment);	
		}
	}*/

	private init() {

		if (this.type instanceof Function && (Component.prototype.isPrototypeOf(this.type.prototype) || this.type === Component)) {
			this.component = new (this.type)(this.props);
			//this.component.setChildren(this.children);
			this.component.runLifeCycleStart();
			//this.component.getElement();
			//this.htmlElement = document.createElement("span");
		} else {
			let htmlElement = document.createElement(this.type as string);

			for (let key in this.props) {
				htmlElement.setAttribute(key, this.props[key]);
			}

			htmlElement.setAttribute("cid", this.ID.toString());
			this.htmlElement = htmlElement;
		}
		//console.log(this.htmlElement, this.ID, this.children);
		//this.appendChildren();
	}

	private isComponent(component: Component | Element) {
		return component instanceof Component;
	}
	
	public setParent(parent: Component | HTMLElement) {
		this.parent = parent;
		if(this.isComponent(parent)) {
			//this.parent
			return;	
		} else if(this.parent instanceof Element && this.htmlElement) {
			this.parent.appendChild(this.htmlElement);
		}		
		this.htmlElement
	}
}

type IVirtualDomObjects = VirtualDomObject[];

export { VirtualDomObject, IVirtualDomObjects };