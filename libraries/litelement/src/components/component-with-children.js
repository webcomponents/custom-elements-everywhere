import { LitElement, html } from "lit-element";
import "ce-with-children";

export default class ComponentWithChildren extends LitElement {
  render() {
    return html`
      <ce-with-children id="wc"></ce-with-children>
    `;
  }
}
window.customElements.define("component-with-children", ComponentWithChildren);
