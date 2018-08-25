import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";

import "ce-without-children";
class ComponentWithoutChildren extends PolymerElement {
  static get is() {
    return "component-without-children";
  }
  static get template() {
    return html`
      <ce-without-children id="wc"></ce-without-children>
    `;
  }
}
window.customElements.define(
  ComponentWithoutChildren.is,
  ComponentWithoutChildren
);
