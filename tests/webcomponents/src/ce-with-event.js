class CEWithEvent extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onClick);
  }
  onClick() {
    this.dispatchEvent(new CustomEvent('test-event'));
  }
}

customElements.define('ce-with-event', CEWithEvent);
