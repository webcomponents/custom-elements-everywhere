import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "ce-with-event";

class ComponentWithImperativeEvent extends PolymerElement {
  static get is() {
    return "component-with-imperative-event";
  }
  static get properties() {
    return {
      eventHandled: {
        type: Boolean,
        value: false
      }
    };
  }
  static get template() {
    return html`
      <div id="handled">[[eventHandled]]</div>
      <ce-with-event id="wc"></ce-with-event>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleTestEvent = this.handleTestEvent.bind(this);
    this.$.wc.addEventListener("camelEvent", this.handleTestEvent);
  }
  handleTestEvent() {
    this.eventHandled = true;
  }
}
window.customElements.define(
  ComponentWithImperativeEvent.is,
  ComponentWithImperativeEvent
);
