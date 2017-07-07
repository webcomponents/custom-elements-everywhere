class CEWithChildren extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h1>Test h1</h1>
      <div>
        <p>Test p</p>
      </div>
    `;
  }
}
customElements.define('ce-with-children', CEWithChildren);
