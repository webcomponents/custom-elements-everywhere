import { AutonomousCustomElement, h, LSCustomElement } from '@lsegurado/ls-element/dist';
import 'ce-with-children';

@AutonomousCustomElement()
export class ComponentWithChildren extends HTMLElement implements LSCustomElement {

	render() {
		return (
			<ce-with-children id="wc"></ce-with-children>
		);
	}
}