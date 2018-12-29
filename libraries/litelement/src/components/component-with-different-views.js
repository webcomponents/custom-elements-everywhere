import { LitElement, html } from "@polymer/lit-element";
import "ce-with-children";

export default class ComponentWithDifferentViews extends LitElement {
  static get properties() {
    return {
      showWC: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.showWC = true;
  }

  render() {
    return this.showWC
      ? html`
          <ce-with-children id="wc"></ce-with-children>
        `
      : html`
          <div id="dummy">Dummy view</div>
        `;
  }

  toggle() {
    this.showWC = !this.showWC;
  }
}
window.customElements.define(
  "component-with-different-views",
  ComponentWithDifferentViews
);
