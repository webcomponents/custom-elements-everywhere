import { LitElement, html } from "@polymer/lit-element";
import "ce-with-event";

class ComponentWithDeclarativeEvent extends LitElement {
  static get properties() {
    return {
      lowercaseHandled: { type: Boolean },
      kebabHandled: { type: Boolean },
      camelHandled: { type: Boolean },
      capsHandled: { type: Boolean },
      pascalHandled: { type: Boolean }
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

  render() {
    return html`
      <div>
        <div id="lowercase">${this.lowercaseHandled}</div>
        <div id="kebab">${this.kebabHandled}</div>
        <div id="camel">${this.camelHandled}</div>
        <div id="caps">${this.capsHandled}</div>
        <div id="pascal">${this.pascalHandled}</div>
        <ce-with-event
          id="wc"
          @lowercaseevent="${
            e => {
              this.handleLowercaseEvent();
            }
          }"
          @kebab-event="${
            e => {
              this.handleKebabEvent();
            }
          }"
          @camelEvent="${
            e => {
              this.handleCamelEvent();
            }
          }"
          @CAPSevent="${
            e => {
              this.handleCapsEvent();
            }
          }"
          @PascalEvent="${
            e => {
              this.handlePascalEvent();
            }
          }"
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
