//import Component from "./Component";
import CreateElement from "./CreateElement";

export default class Core {

	//private rootComponent: Component;
	//@ts-ignore
	constructor(private rootElement: HTMLElement, private RootComponent: IComponentClass) {
		this.runVirtualDom();
	}

	private async runVirtualDom(): Promise<void> {
		let virtualDom = CreateElement(this.RootComponent, {});
		virtualDom.setParent(this.rootElement);
		//this.rootElement.appendChild(virtualDom.htmlElement);
	}
}