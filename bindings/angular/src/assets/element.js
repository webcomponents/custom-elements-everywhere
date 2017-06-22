'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XElement = function (_HTMLElement) {
  _inherits(XElement, _HTMLElement);

  _createClass(XElement, null, [{
    key: 'observedAttributes',
    get: function get() {
      return ['boolean', 'number', 'string', 'array', 'object', 'undefined-boolean', 'undefined-number', 'undefined-string', 'undefined-array', 'undefined-object'];
    }
  }]);

  function XElement() {
    _classCallCheck(this, XElement);

    var _this = _possibleConstructorReturn(this, (XElement.__proto__ || Object.getPrototypeOf(XElement)).call(this));

    _this.attachShadow({ mode: 'open' });
    _this.shadowRoot.innerHTML = '<div>x-element:</div><hr/>';
    return _this;
  }

  _createClass(XElement, [{
    key: 'logAttribute',
    value: function logAttribute(name, value) {
      var div = document.createElement('div');
      div.textContent = name + ' set via attribute: ' + value;
      this.shadowRoot.appendChild(div);
    }
  }, {
    key: 'logProperty',
    value: function logProperty(name, value) {
      var div = document.createElement('div');
      div.textContent = name + ' set via property: ' + JSON.stringify(value);
      this.shadowRoot.appendChild(div);
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldVal, newVal) {
      this.logAttribute(name, newVal);
    }
  }, {
    key: 'boolean',
    set: function set(value) {
      this.logProperty('boolean', value);
      this._boolean = value;
    },
    get: function get() {
      return this._boolean;
    }
  }, {
    key: 'number',
    set: function set(value) {
      this.logProperty('number', value);
      this._number = value;
    },
    get: function get() {
      return this._number;
    }
  }, {
    key: 'string',
    set: function set(value) {
      this.logProperty('string', value);
      this._string = value;
    },
    get: function get() {
      return this._string;
    }
  }, {
    key: 'array',
    set: function set(value) {
      this.logProperty('array', value);
      this._array = value;
    },
    get: function get() {
      return this._array;
    }
  }, {
    key: 'object',
    set: function set(value) {
      this.logProperty('object', value);
      this._object = value;
    },
    get: function get() {
      return this._object;
    }
  }]);

  return XElement;
}(HTMLElement);

customElements.define('x-element', XElement);
