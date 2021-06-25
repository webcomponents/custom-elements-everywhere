import { AutonomousCustomElement, h, LSCustomElement } from '@lsegurado/ls-element/dist';
import 'ce-without-children';

@AutonomousCustomElement()
export class ComponentWithoutChildren extends HTMLElement implements LSCustomElement {

  render() {
    return (
      <ce-without-children id="wc"></ce-without-children>
    );
  }
}