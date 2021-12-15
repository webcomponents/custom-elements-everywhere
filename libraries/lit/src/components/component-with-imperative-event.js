import { LitElement, html } from "@polymer/lit-element";
import "ce-with-event";

class ComponentWithImperativeEvent extends LitElement {
  static get is() {
    return "component-with-imperative-event";
  }
  static get properties() {
    return {
      eventHandled: { type: Boolean }
    };
  }
  constructor() {
    super();
    this.eventHandled = false;
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.handleTestEvent = this.handleTestEvent.bind(this);
    this.shadowRoot
      .getElementById("wc")
      .addEventListener("camelEvent", this.handleTestEvent);
  }
  handleTestEvent() {
    this.eventHandled = true;
  }
  render() {
    return html`
      <div id="handled">${this.eventHandled}</div>
      <ce-with-event id="wc"></ce-with-event>
    `;
  }
}
window.customElements.define(
  "component-with-imperative-event",
  ComponentWithImperativeEvent
);
