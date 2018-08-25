import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-if.js";
import "ce-with-children";

class ComponentWithDifferentViews extends PolymerElement {
  static get is() {
    return "component-with-different-views";
  }
  static get properties() {
    return {
      showWC: {
        type: Boolean,
        value: true
      }
    };
  }

  static get template() {
    return html`
      <div>
        <template is="dom-if" if="[[showWC]]">
          <ce-with-children id="wc"></ce-with-children>
        </template>
        <template is="dom-if" if="[[!showWC]]">
          <div id="dummy">Dummy view</div>
        </template>
      </div>
    `;
  }

  toggle() {
    this.showWC = !this.showWC;
  }
}
window.customElements.define(
  ComponentWithDifferentViews.is,
  ComponentWithDifferentViews
);
