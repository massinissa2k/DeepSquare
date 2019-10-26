import * as DeepSquare from "../DeepSquare";
import TestComponent from "./TestComponent";

class RootComponent extends DeepSquare.Component {
	constructor(props: any) {
		super(props);
		this.props.updateCounter = 0;
	}

	public async render(): Promise<JSX.Element | JSX.Element[]> {
		let elem = ([
			<div class="root-component" >
				{this.props.updateCounter++}
				<TestComponent>TestComponent</TestComponent>
			</div>,
			<div class="root-element-2">
				<TestComponent></TestComponent>
				<TestComponent></TestComponent>
				<div>Message</div>
			</div>
		]);
		return elem;
	}
}

export default RootComponent;