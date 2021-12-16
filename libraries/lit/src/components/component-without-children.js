import { LitElement, html } from "lit";
import "ce-without-children";

export default class ComponentWithoutChildren extends LitElement {
  render() {
    return html`
      <ce-without-children id="wc"></ce-without-children>
    `;
  }
}
customElements.define(
  "component-without-children",
  ComponentWithoutChildren
);
