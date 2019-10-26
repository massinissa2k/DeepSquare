//import Component from "./Component";
import { IComponentClass, IComponentProps } from ".";
import { IVirtualDomObjects, VirtualDomObject } from "./VirtualDom";

export default function CreateElement(type: IComponentClass | string, props: IComponentProps, ...children: IVirtualDomObjects): VirtualDomObject {
	console.log(type, children);
	let vDom = new VirtualDomObject(type, props, children);
	return vDom;
}