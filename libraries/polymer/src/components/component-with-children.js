import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "ce-with-children";
class ComponentWithChildren extends PolymerElement {
  static get is() {
    return "component-with-children";
  }
  static get template() {
    return html`
      <ce-with-children id="wc"></ce-with-children>
    `;
  }
}
window.customElements.define(ComponentWithChildren.is, ComponentWithChildren);
