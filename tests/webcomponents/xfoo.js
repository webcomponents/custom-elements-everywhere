class XFoo extends HTMLElement {
  connectedCallback() {
    console.log('x-foo connected');
  }
}
customElements.define('x-foo', XFoo);
