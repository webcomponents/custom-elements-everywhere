import { LitElement, html } from "lit";
import "ce-without-settable-properties";

class ComponentWithoutProperties extends LitElement {

  static get properties() {
    return {};
  }

  render() {
    return html`
      <div>
        <ce-without-settable-properties
          id="wc"
          amethod="${"method"}"
          agetter="${"getter"}"
          areadonly="${"readonly"}"
        ></ce-without-settable-properties>
      </div>
    `;
  }
}
customElements.define(
  "component-without-properties",
  ComponentWithoutProperties
);
