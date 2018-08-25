import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "ce-with-event";

class ComponentWithDeclarativeEvent extends PolymerElement {
  static get is() {
    return "component-with-declarative-event";
  }
  static get properties() {
    return {
      lowercaseHandled: {
        type: Boolean,
        value: false
      },
      kebabHandled: {
        type: Boolean,
        value: false
      },
      camelHandled: {
        type: Boolean,
        value: false
      },
      capsHandled: {
        type: Boolean,
        value: false
      },
      pascalHandled: {
        type: Boolean,
        value: false
      }
    };
  }
  static get template() {
    return html`
      <div>
        <div id="lowercase">[[lowercaseHandled]]</div>
        <div id="kebab">[[kebabHandled]]</div>
        <div id="camel">[[camelHandled]]</div>
        <div id="caps">[[capsHandled]]</div>
        <div id="pascal">[[pascalHandled]]</div>
        <ce-with-event id="wc"
          on-lowercaseevent="handleLowercaseEvent"
          on-kebab-event="handleKebabEvent"
          on-camelEvent="handleCamelEvent"
          on-CAPSevent="handleCapsEvent"
          on-PascalEvent="handlePascalEvent"
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
  ComponentWithDeclarativeEvent.is,
  ComponentWithDeclarativeEvent
);
