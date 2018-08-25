import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "ce-with-children";

class ComponentWithChildrenRerender extends PolymerElement {
  static get is() {
    return "component-with-children-rerender";
  }
  static get properties() {
    return {
      count: {
        type: Number,
        value: 1
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    Promise.resolve().then(
      function() {
        this.count += 1;
      }.bind(this)
    );
  }

  static get template() {
    return html`
      <ce-with-children id="wc">[[count]]</ce-with-children>
    `;
  }
}
window.customElements.define(
  ComponentWithChildrenRerender.is,
  ComponentWithChildrenRerender
);
