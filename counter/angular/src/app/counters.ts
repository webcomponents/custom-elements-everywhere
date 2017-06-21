const template = '<div>Count: <slot></slot></div>';

class Count extends HTMLElement {
  connectedCallback () {
    this.innerHTML = template;
  }
}

class CountWithShadow extends HTMLElement {
  connectedCallback () {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template;
  }
}

customElements.define('x-count', Count);
customElements.define('x-count-with-shadow', CountWithShadow);
