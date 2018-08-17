import {LitElement, html} from '@polymer/lit-element';
import 'ce-with-event';

class ComponentWithImperativeEvent extends LitElement {
  static get is() { return 'component-with-imperative-event'; }
  static get properties() {
    return {
      eventHandled: Boolean
    }
	}
	constructor() {
		super();
		this.eventHandled = false;
	}

  _render({eventHandled}){
    return html`
      <div id="handled">${eventHandled}</div>
      <ce-with-event id="wc"></ce-with-event>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleTestEvent = this.handleTestEvent.bind(this);
		this.shadowRoot.getElementById('wc').addEventListener('camelEvent', this.handleTestEvent);
  }
  handleTestEvent() {
    this.eventHandled = true;
  }
}
window.customElements.define('component-with-imperative-event', ComponentWithImperativeEvent);
