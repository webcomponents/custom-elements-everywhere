import { LitElement, html } from "@polymer/lit-element";
import "ce-with-properties";

class ComponentWithProperties extends LitElement {
  static get properties() {
    return {
      bool: Boolean,
      num: Number,
      str: String,
      arr: Array,
      obj: Object
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

  _render({ bool, num, str, arr, obj }) {
    return html`
      <div>
        <ce-with-properties id="wc"
          bool="${bool}"
          num="${num}"
          str="${str}"
          arr="${arr}"
          obj="${obj}"
        ></ce-with-properties>
      </div>
    `;
  }
}
window.customElements.define(
  "component-with-properties",
  ComponentWithProperties
);
