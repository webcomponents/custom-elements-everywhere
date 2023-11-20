import { LitElement, html } from "lit";
import "ce-with-inheritance";

class ComponentWithInheritance extends LitElement {
  static get properties() {
    return {
      bool: { type: Boolean },
      num: { type: Number },
      str: { type: String },
      arr: { type: Array },
      obj: { type: Object },
      camelCaseObj: { type: Object },
    };
  }

  constructor() {
    super();
    this.bool = true;
    this.num = 42;
    this.str = "Lit";
    this.arr = ["L", "i", "t"];
    this.obj = { org: "lit", repo: "lit" };
  }

  render() {
    return html`
      <div>
        <ce-with-inheritance
          id="wc"
          bool="${this.bool}"
          num="${this.num}"
          str="${this.str}"
          .arr="${this.arr}"
          .obj="${this.obj}"
          .camelCaseObj=${{ label: "passed" }}
        ></ce-with-inheritance>
      </div>
    `;
  }
}
customElements.define(
  "component-with-inheritance",
  ComponentWithInheritance
);
