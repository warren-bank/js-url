;
(function () {
  "use strict";

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  var regexs = {
    url: new RegExp('^([^/:]+:)?//(?:([^/:@]+):?([^/:@]+)?@)?([^:/\\?#]+)(?::(\\d+))?(/[^\\?#]*)?(\\?[^#]*)?(#.*)?$'),
    host: /^([^:]+)(?::(\d+))?$/
  };
  var _searchParams = new WeakMap();
  var URL = function () {
    function URL(url, base) {
      _classCallCheck(this, URL);
      _classPrivateFieldInitSpec(this, _searchParams, {
        writable: true,
        value: ''
      });
      if (base) url = URL.resolve(url, base) || '';
      this.href = url;
    }
    _createClass(URL, [{
      key: "toString",
      value: function toString() {
        return "".concat(this.protocol, "//").concat(this.username ? this.password ? "".concat(this.username, ":").concat(this.password, "@") : "".concat(this.username, "@") : '').concat(this.host).concat(this.pathname).concat(this.search).concat(this.hash);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.toString();
      }
    }, {
      key: "href",
      get: function get() {
        return this.toString();
      },
      set: function set(url) {
        var matches = regexs.url.exec(url);
        if (!matches) throw new Error("Failed to construct 'URL': Invalid URL");
        this.protocol = matches[1] || '';
        this.username = matches[2] || '';
        this.password = matches[3] || '';
        this.hostname = matches[4] || '';
        this.port = matches[5] || '';
        this.pathname = matches[6] || '';
        this.search = matches[7] || '';
        this.hash = matches[8] || '';
      }
    }, {
      key: "host",
      get: function get() {
        return this.port ? "".concat(this.hostname, ":").concat(this.port) : this.hostname;
      },
      set: function set(host) {
        var matches = regexs.host.exec(host);
        if (!matches) throw new Error("Failed to update 'URL': Invalid host");
        this.hostname = matches[1] || '';
        this.port = matches[2] || '';
      }

    }, {
      key: "origin",
      get:
      function get() {
        return "".concat(this.protocol, "//").concat(this.host);
      }
    }, {
      key: "search",
      get: function get() {
        return _classPrivateFieldGet(this, _searchParams).toString();
      },
      set: function set(search) {
        _classPrivateFieldSet(this, _searchParams, new URLSearchParams(search));
      }

    }, {
      key: "searchParams",
      get:
      function get() {
        return _classPrivateFieldGet(this, _searchParams);
      }

    }, {
      key: "parse",
      value:

      function parse() {
        var parseQueryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return {
          slashes: true,
          href: this.href,
          protocol: this.protocol,
          username: this.username,
          password: this.password,
          auth: "".concat(this.username ? this.password ? "".concat(this.username, ":").concat(this.password) : "".concat(this.username) : ''),
          hostname: this.hostname,
          port: this.port,
          host: this.host,
          pathname: this.pathname,
          search: this.search,
          path: "".concat(this.pathname).concat(this.search),
          query: parseQueryString ? this.searchParams.parse() : this.searchParams.toString(true),
          hash: this.hash
        };
      }
    }], [{
      key: "resolve",
      value: function resolve(url, base) {
        var baseURL;
        try {
          new URL(url);
          return url;
        } catch (e) {}
        try {
          baseURL = new URL(base);
        } catch (e) {
          return null;
        }

        if (!url) return base;else if (url.substring(0, 2) === '//') return "".concat(baseURL.protocol).concat(url);else if (url.substring(0, 1) === '/') return "".concat(baseURL.protocol, "//").concat(baseURL.username ? baseURL.password ? "".concat(baseURL.username, ":").concat(baseURL.password, "@") : "".concat(baseURL.username, "@") : '').concat(baseURL.host).concat(url);else if (url.substring(0, 1) === '?') return "".concat(baseURL.protocol, "//").concat(baseURL.username ? baseURL.password ? "".concat(baseURL.username, ":").concat(baseURL.password, "@") : "".concat(baseURL.username, "@") : '').concat(baseURL.host).concat(baseURL.pathname).concat(url);else if (url.substring(0, 1) === '#') return "".concat(baseURL.protocol, "//").concat(baseURL.username ? baseURL.password ? "".concat(baseURL.username, ":").concat(baseURL.password, "@") : "".concat(baseURL.username, "@") : '').concat(baseURL.host).concat(baseURL.pathname).concat(baseURL.search).concat(url);else return "".concat(baseURL.protocol, "//").concat(baseURL.username ? baseURL.password ? "".concat(baseURL.username, ":").concat(baseURL.password, "@") : "".concat(baseURL.username, "@") : '').concat(baseURL.host).concat(baseURL.pathname.replace(/[^\/]+$/, '')).concat(url);
      }
    }]);
    return URL;
  }();
  var _map = new WeakMap();
  var _sorted = new WeakMap();
  var URLSearchParams = function () {
    function URLSearchParams(search) {
      var _this = this;
      _classCallCheck(this, URLSearchParams);
      _classPrivateFieldInitSpec(this, _map, {
        writable: true,
        value: {}
      });
      _classPrivateFieldInitSpec(this, _sorted, {
        writable: true,
        value: false
      });
      _classPrivateFieldSet(this, _map, {});
      if (search && search[0] === '?') search = search.substring(1);
      if (search) {
        var pairs = search.split('&');
        pairs.forEach(function (pair) {
          var index = pair.indexOf('=');
          if (index > 0) {
            var key = pair.substring(0, index);
            var val = index + 1 < pair.length ? pair.substring(index + 1) : '';
            if (!_classPrivateFieldGet(_this, _map)[key]) _classPrivateFieldGet(_this, _map)[key] = [];
            _classPrivateFieldGet(_this, _map)[key].push(val);
          }
        });
      }
    }
    _createClass(URLSearchParams, [{
      key: "has",
      value: function has(key) {
        return !!_classPrivateFieldGet(this, _map)[key];
      }
    }, {
      key: "get",
      value: function get(key) {
        return _classPrivateFieldGet(this, _map)[key] ? _classPrivateFieldGet(this, _map)[key][0] : null;
      }
    }, {
      key: "getAll",
      value: function getAll(key) {
        return _classPrivateFieldGet(this, _map)[key] ? _toConsumableArray(_classPrivateFieldGet(this, _map)[key]) : [];
      }
    }, {
      key: "set",
      value: function set(key, val) {
        _classPrivateFieldGet(this, _map)[key] = [val];
      }
    }, {
      key: "append",
      value: function append(key, val) {
        if (!_classPrivateFieldGet(this, _map)[key]) _classPrivateFieldGet(this, _map)[key] = [];
        _classPrivateFieldGet(this, _map)[key].push(val);
      }
    }, {
      key: "delete",
      value: function _delete(key, val) {
        if (!_classPrivateFieldGet(this, _map)[key]) return;
        if (val) {
          var index = _classPrivateFieldGet(this, _map)[key].indexOf(val);
          if (index >= 0) {
            _classPrivateFieldGet(this, _map)[key].splice(index, 1);
            if (!_classPrivateFieldGet(this, _map)[key].length) delete _classPrivateFieldGet(this, _map)[key];
          }
        } else {
          delete _classPrivateFieldGet(this, _map)[key];
        }
      }
    }, {
      key: "sort",
      value: function sort() {
        var sorted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        _classPrivateFieldSet(this, _sorted, !!sorted);
      }
    }, {
      key: "keys",
      value: function keys() {
        var keys = Object.keys(_classPrivateFieldGet(this, _map));
        if (_classPrivateFieldGet(this, _sorted)) keys.sort();
        return keys;
      }
    }, {
      key: "values",
      value: function values() {
        var values = [];
        for (var key in _classPrivateFieldGet(this, _map)) {
          values.push.apply(values, _toConsumableArray(_classPrivateFieldGet(this, _map)[key]));
        }
        if (_classPrivateFieldGet(this, _sorted)) values.sort();
        return values;
      }
    }, {
      key: "entries",
      value: function entries() {
        var _this2 = this;
        var denormalized = [];
        var keys = this.keys();
        keys.forEach(function (key) {
          var vals = _classPrivateFieldGet(_this2, _sorted) ? _toConsumableArray(_classPrivateFieldGet(_this2, _map)[key]).sort() : _classPrivateFieldGet(_this2, _map)[key];
          vals.forEach(function (val) {
            denormalized.push([key, val]);
          });
        });
        return denormalized;
      }
    }, {
      key: "forEach",
      value: function forEach(callback, thisArg) {
        var _this3 = this;
        var denormalized = this.entries();
        denormalized.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];
          callback.apply(thisArg, [val, key, _this3]);
        });
      }
    }, {
      key: "toString",
      value: function toString() {
        var exclude_question_mark = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var search = '';
        var denormalized = this.entries();
        denormalized.forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            val = _ref4[1];
          var prefix = search ? '&' : exclude_question_mark ? '' : '?';
          search += "".concat(prefix).concat(key, "=").concat(val);
        });
        return search;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.toString();
      }

    }, {
      key: "parse",
      value:

      function parse() {
        var map_clone = {};
        for (var key in _classPrivateFieldGet(this, _map)) {
          map_clone[key] = _toConsumableArray(_classPrivateFieldGet(this, _map)[key]);
        }
        return map_clone;
      }
    }]);
    return URLSearchParams;
  }();
  var parse = function parse(url) {
    var parseQueryString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return new URL(url).parse(parseQueryString);
  };
  var resolve = function resolve(base, url) {
    var placeholder = {
      protocol: 'resolve:',
      hostname: 'resolve.domain',
      pathname: '/'
    };
    var resolvedURL = new URL(url, new URL(base, "".concat(placeholder.protocol, "//").concat(placeholder.hostname).concat(placeholder.pathname)));
    url = resolvedURL.toString();
    if (resolvedURL.protocol === placeholder.protocol) {
      var prefix = "".concat(placeholder.protocol, "//");
      if (resolvedURL.hostname === placeholder.hostname) prefix += placeholder.hostname;
      url = url.substring(prefix.length);
    }
    return url;
  };
  try {
    if (module instanceof Object) module.exports = {
      URL: URL,
      URLSearchParams: URLSearchParams,
      parse: parse,
      resolve: resolve
    };
  } catch (e) {}
  try {
    if (window instanceof Object) window.jsURL = {
      URL: URL,
      URLSearchParams: URLSearchParams,
      parse: parse,
      resolve: resolve
    };
  } catch (e) {}
})();

//# sourceMappingURL=jsURL.js.map