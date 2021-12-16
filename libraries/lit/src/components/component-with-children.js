import { LitElement, html } from "lit";
import "ce-with-children";

export default class ComponentWithChildren extends LitElement {
  render() {
    return html`
      <ce-with-children id="wc"></ce-with-children>
    `;
  }
}
customElements.define("component-with-children", ComponentWithChildren);
