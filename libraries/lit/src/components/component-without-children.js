import { LitElement, html } from "@polymer/lit-element";
import "ce-without-children";

export default class ComponentWithoutChildren extends LitElement {
  render() {
    return html`
      <ce-without-children id="wc"></ce-without-children>
    `;
  }
}
window.customElements.define(
  "component-without-children",
  ComponentWithoutChildren
);
