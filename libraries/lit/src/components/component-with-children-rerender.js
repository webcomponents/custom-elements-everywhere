import { LitElement, html } from "lit";
import "ce-with-children";

export default class ComponentWithChildrenRerender extends LitElement {
  static get properties() {
    return { count: { type: Number } };
  }
  constructor() {
    super();
    this.count = 1;
  }

  firstUpdated() {
    this.count += 1;
  }

  render() {
    return html`
      <ce-with-children id="wc">${this.count}</ce-with-children>
    `;
  }
}
customElements.define(
  "component-with-children-rerender",
  ComponentWithChildrenRerender
);
