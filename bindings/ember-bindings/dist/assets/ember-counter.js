"use strict";



define('ember-counter/app', ['exports', 'ember', 'ember-counter/resolver', 'ember-load-initializers', 'ember-counter/config/environment'], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  _ember.default.MODEL_FACTORY_INJECTIONS = true;

  App = _ember.default.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('ember-counter/components/element', [], function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

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
});
define('ember-counter/components/main-page', ['exports', 'ember', 'ember-counter/components/element'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Component.extend({
    data: {
      boolean: true,
      number: 42,
      string: 'Ember',
      array: ['E', 'm', 'b', 'e', 'r'],
      object: { org: 'emberjs', repo: 'emberjs' },
      undefinedBoolean: true,
      undefinedNumber: 42,
      undefinedString: 'Ember',
      undefinedArray: ['E', 'm', 'b', 'e', 'r'],
      undefinedObject: { org: 'emberjs', repo: 'emberjs' }
    }
  });
});
define('ember-counter/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('ember-counter/helpers/app-version', ['exports', 'ember', 'ember-counter/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = _ember.default.Helper.helper(appVersion);
});
define('ember-counter/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('ember-counter/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('ember-counter/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-counter/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('ember-counter/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-counter/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-counter/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('ember-counter/initializers/export-application-global', ['exports', 'ember', 'ember-counter/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-counter/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-counter/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ember-counter/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("ember-counter/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('ember-counter/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('ember-counter/router', ['exports', 'ember', 'ember-counter/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = _ember.default.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define('ember-counter/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("ember-counter/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CNdGI1wT", "block": "{\"statements\":[[1,[26,[\"main-page\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-counter/templates/application.hbs" } });
});
define("ember-counter/templates/components/main-page", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "XTigoZ+3", "block": "{\"statements\":[[11,\"div\",[]],[13],[0,\"\\n  \"],[9,\"x-element\",{\"attrs\":[[16,\"boolean\",[28,[\"data\",\"boolean\"]],null],[16,\"number\",[28,[\"data\",\"number\"]],null],[16,\"string\",[28,[\"data\",\"string\"]],null],[16,\"array\",[28,[\"data\",\"array\"]],null],[16,\"object\",[28,[\"data\",\"object\"]],null],[16,\"undefined-boolean\",[28,[\"data\",\"undefinedBoolean\"]],null],[16,\"undefined-number\",[28,[\"data\",\"undefinedNumber\"]],null],[16,\"undefined-string\",[28,[\"data\",\"undefinedString\"]],null],[16,\"undefined-array\",[28,[\"data\",\"undefinedArray\"]],null],[16,\"undefined-object\",[28,[\"data\",\"undefinedObject\"]],null]],\"args\":[[],[]],\"locals\":[],\"statements\":[]}],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-counter/templates/components/main-page.hbs" } });
});


define('ember-counter/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-counter';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("ember-counter/app")["default"].create({"name":"ember-counter","version":"0.0.0+b190571a"});
}
//# sourceMappingURL=ember-counter.map
