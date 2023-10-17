import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "ce-with-inheritance";

class ComponentWithInheritance extends PolymerElement {
  static get is() {
    return "component-with-inheritance";
  }
  static get properties() {
    return {
      bool: {
        type: Boolean,
        value: true
      },
      num: {
        type: Number,
        value: 42
      },
      str: {
        type: String,
        value: "Polymer"
      },
      arr: {
        type: Array,
        value: function() {
          return ["P", "o", "l", "y", "m", "e", "r"];
        }
      },
      obj: {
        type: Object,
        value: function() {
          return { org: "polymer", repo: "polymer" };
        }
      },
      camelCaseObj: {
        type: Object,
        value: function() {
          return { label: "passed" };
        }
      }
    };
  }
  static get template() {
    return html`
      <div>
        <ce-with-inheritance id="wc"
          bool="[[bool]]"
          num="[[num]]"
          str="[[str]]"
          arr="[[arr]]"
          obj="[[obj]]"
          camel-case-obj="[[camelCaseObj]]"
        ></ce-with-inheritance>
      </div>
    `;
  }
}
window.customElements.define(
  ComponentWithInheritance.is,
  ComponentWithInheritance
);
