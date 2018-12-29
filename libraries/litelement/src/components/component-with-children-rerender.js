import { LitElement, html } from "@polymer/lit-element";
import "ce-with-children";

export default class ComponentWithChildrenRerender extends LitElement {
  static get properties() {
    return { count: { type: Number } };
  }
  constructor() {
    super();
    this.count = 1;
  }

  connectedCallback() {
    super.connectedCallback();
    Promise.resolve().then(
      function() {
        this.count += 1;
      }.bind(this)
    );
  }

  render() {
    return html`
      <ce-with-children id="wc">${this.count}</ce-with-children>
    `;
  }
}
window.customElements.define(
  "component-with-children-rerender",
  ComponentWithChildrenRerender
);
