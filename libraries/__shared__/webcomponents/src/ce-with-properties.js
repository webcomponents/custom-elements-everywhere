class CEWithProperties extends HTMLElement {
  set bool(value) {
    this._bool = value;
  }
  get bool() {
    return this._bool;
  }
  set num(value) {
    this._num = value;
  }
  get num() {
    return this._num;
  }
  set str(value) {
    this._str = value;
  }
  get str() {
    return this._str;
  }
  set arr(value) {
    this._arr = value;
  }
  get arr() {
    return this._arr;
  }
  set obj(value) {
    this._obj = value;
  }
  get obj() {
    return this._obj;
  }
}

customElements.define('ce-with-properties', CEWithProperties);
