import { LitElement, html } from "@polymer/lit-element";
import "ce-with-event";

class ComponentWithDeclarativeEvent extends LitElement {
  static get properties() {
    return {
      lowercaseHandled: Boolean,
      kebabHandled: Boolean,
      camelHandled: Boolean,
      capsHandled: Boolean,
      pascalHandled: Boolean
    };
  }

  constructor() {
    super();
    this.lowercaseHandled = false;
    this.kebabHandled = false;
    this.camelHandled = false;
    this.capsHandled = false;
    this.pascalHandled = false;
  }

  _render({
    lowercaseHandled,
    kebabHandled,
    camelHandled,
    capsHandled,
    pascalHandled
  }) {
    return html`
      <div>
        <div id="lowercase">${lowercaseHandled}</div>
        <div id="kebab">${kebabHandled}</div>
        <div id="camel">${camelHandled}</div>
        <div id="caps">${capsHandled}</div>
        <div id="pascal">${pascalHandled}</div>
        <ce-with-event id="wc"
          on-lowercaseevent="${e => {
            this.handleLowercaseEvent();
          }}"
          on-kebab-event="${e => {
            this.handleKebabEvent();
          }}"
          on-camelEvent="${e => {
            this.handleCamelEvent();
          }}"
          on-CAPSevent="${e => {
            this.handleCapsEvent();
          }}"
          on-PascalEvent="${e => {
            this.handlePascalEvent();
          }}"
        ></ce-with-event>
      </div>
    `;
  }
  handleLowercaseEvent() {
    this.lowercaseHandled = true;
  }
  handleKebabEvent() {
    this.kebabHandled = true;
  }
  handleCamelEvent() {
    this.camelHandled = true;
  }
  handleCapsEvent() {
    this.capsHandled = true;
  }
  handlePascalEvent() {
    this.pascalHandled = true;
  }
}
window.customElements.define(
  "component-with-declarative-event",
  ComponentWithDeclarativeEvent
);
