import { AutonomousCustomElement, h, Child, Attribute, LSCustomElement } from '@lsegurado/ls-element/dist';
import 'ce-with-event';

@AutonomousCustomElement()
export class ComponentWithImperativeEvent extends HTMLElement implements LSCustomElement {
  @Attribute() eventHandled = false;
  @Child('wc') customEl: HTMLElement;

  componentDidMount() {
    this.customEl.addEventListener(
      "camelEvent",
      () => { this.eventHandled = true }
    );
  }

  render() {
    return (
      <>
        <div id="handled">{this.eventHandled.toString()}</div>
        <ce-with-event id="wc"></ce-with-event>
      </>
    );
  }
}