import { AutonomousCustomElement, h, Attribute, LSCustomElement } from '@lsegurado/ls-element/dist';
import 'ce-with-children';

@AutonomousCustomElement()
export class ComponentWithChildrenRerender extends HTMLElement implements LSCustomElement {
	@Attribute() count = 1;

	componentWillMount() {
		this.count++;
	}

	render() {
		return (
			<ce-with-children id="wc"><div id="count">{this.count}</div></ce-with-children>
		);
	}
}