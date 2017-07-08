class CEWithEvent extends HTMLElement {
  constructor() {
    this.addEventListener('click', this.onClick);
  }
  onClick() {
    this.dispatchEvent(new CustomEvent('test-event'));
  }
}
