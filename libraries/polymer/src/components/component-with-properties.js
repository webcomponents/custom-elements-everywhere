import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "ce-with-properties";

class ComponentWithProperties extends PolymerElement {
  static get is() {
    return "component-with-properties";
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
      }
    };
  }
  static get template() {
    return html`
      <div>
        <ce-with-properties id="wc"
          bool="[[bool]]"
          num="[[num]]"
          str="[[str]]"
          arr="[[arr]]"
          obj="[[obj]]"
        ></ce-with-properties>
      </div>
    `;
  }
}
window.customElements.define(
  ComponentWithProperties.is,
  ComponentWithProperties
);
