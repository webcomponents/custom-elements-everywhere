class XFoo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello from x-foo</h1>`;
  }
}
customElements.define('x-foo', XFoo);
