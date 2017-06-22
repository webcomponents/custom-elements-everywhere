class XElement extends HTMLElement {
  static get observedAttributes() {
    return [
      'boolean', 'number', 'string', 'array', 'object',
      'undefined-boolean', 'undefined-number', 'undefined-string',
      'undefined-array', 'undefined-object'
    ];
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<div>x-element:</div><hr/>`;
  }
  logAttribute(name, value) {
    const div = document.createElement('div');
    div.textContent = `${name} set via attribute: ${value}`;
    this.shadowRoot.appendChild(div);
  }
  logProperty(name, value) {
    const div = document.createElement('div');
    div.textContent = `${name} set via property: ${JSON.stringify(value)}`;
    this.shadowRoot.appendChild(div);
  }
  attributeChangedCallback(name, oldVal, newVal) {
    this.logAttribute(name, newVal);
  }
  set boolean(value) {
    this.logProperty('boolean', value);
    this._boolean = value;
  }
  get boolean() {
    return this._boolean;
  }
  set number(value) {
    this.logProperty('number', value);
    this._number = value;
  }
  get number() {
    return this._number;
  }
  set string(value) {
    this.logProperty('string', value);
    this._string = value;
  }
  get string() {
    return this._string;
  }
  set array(value) {
    this.logProperty('array', value);
    this._array = value;
  }
  get array() {
    return this._array;
  }
  set object(value) {
    this.logProperty('object', value);
    this._object = value;
  }
  get object() {
    return this._object;
  }
}

customElements.define('x-element', XElement);
