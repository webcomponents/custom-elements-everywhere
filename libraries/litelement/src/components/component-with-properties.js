import { LitElement, html } from "@polymer/lit-element";
import "ce-with-properties";

class ComponentWithProperties extends LitElement {
  static get properties() {
    return {
      bool: { type: Boolean },
      num: { type: Number },
      str: { type: String },
      arr: { type: Array },
      obj: { type: Object }
    };
  }

  constructor() {
    super();
    this.bool = true;
    this.num = 42;
    this.str = "Lit element";
    this.arr = ["L", "i", "t", "-", "e", "l", "e", "m", "e", "n", "t"];
    this.obj = { org: "polymer", repo: "lit-element" };
  }

  render() {
    return html`
      <div>
        <ce-with-properties
          id="wc"
          bool="${this.bool}"
          num="${this.num}"
          str="${this.str}"
          .arr="${this.arr}"
          .obj="${this.obj}"
        ></ce-with-properties>
      </div>
    `;
  }
}
window.customElements.define(
  "component-with-properties",
  ComponentWithProperties
);
