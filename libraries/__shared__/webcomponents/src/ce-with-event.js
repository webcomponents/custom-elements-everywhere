class CEWithEvent extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onClick);
  }
  onClick() {
    this.dispatchEvent(new CustomEvent('lowercaseevent'));
    this.dispatchEvent(new CustomEvent('kebab-event'));
    this.dispatchEvent(new CustomEvent('camelEvent'));
    this.dispatchEvent(new CustomEvent('CAPSevent'));
    this.dispatchEvent(new CustomEvent('PascalEvent'));
  }
}

customElements.define('ce-with-event', CEWithEvent);
