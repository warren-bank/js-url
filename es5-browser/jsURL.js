;
(function () {
  "use strict";

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
  var regexs = {
    url: new RegExp('^([^/:]+:)//(?:([^/:@]+):?([^/:@]+)?@)?([^/:]+)(?::(\\d+))?(/[^\\?#]*)(\\?[^#]*)?(#.*)?$'),
    host: /^([^:]+)(?::(\d+))?$/
  };
  var URL = function () {
    function URL(url, base) {
      _classCallCheck(this, URL);
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
        return this._searchParams.toString();
      },
      set: function set(search) {
        this._searchParams = new URLSearchParams(search);
      }

    }, {
      key: "searchParams",
      get:
      function get() {
        return this._searchParams;
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
  var URLSearchParams = function () {
    function URLSearchParams(search) {
      var _this = this;
      _classCallCheck(this, URLSearchParams);
      this.map = {};
      if (search && search[0] === '?') search = search.substring(1);
      if (search) {
        var pairs = search.split('&');
        pairs.forEach(function (pair) {
          var index = pair.indexOf('=');
          if (index > 0) {
            var key = pair.substring(0, index);
            var val = index + 1 < pair.length ? pair.substring(index + 1) : '';
            if (!_this.map[key]) _this.map[key] = [];
            _this.map[key].push(val);
          }
        });
      }
    }
    _createClass(URLSearchParams, [{
      key: "has",
      value: function has(key) {
        return !!this.map[key];
      }
    }, {
      key: "get",
      value: function get(key) {
        return this.map[key] ? this.map[key][0] : null;
      }
    }, {
      key: "getAll",
      value: function getAll(key) {
        return this.map[key] ? _toConsumableArray(this.map[key]) : [];
      }
    }, {
      key: "set",
      value: function set(key, val) {
        this.map[key] = [val];
      }
    }, {
      key: "append",
      value: function append(key, val) {
        if (!this.map[key]) this.map[key] = [];
        this.map[key].push(val);
      }
    }, {
      key: "delete",
      value: function _delete(key, val) {
        if (!this.map[key]) return;
        if (val) {
          var index = this.map[key].indexOf(val);
          if (index >= 0) {
            this.map[key].splice(index, 1);
            if (!this.map[key].length) delete this.map[key];
          }
        } else {
          delete this.map[key];
        }
      }
    }, {
      key: "keys",
      value: function keys() {
        return Object.keys(this.map);
      }
    }, {
      key: "toString",
      value: function toString(exclude_question_mark) {
        var _this2 = this;
        var search = '';
        var keys = this.keys();
        keys.forEach(function (key) {
          var vals = _this2.map[key];
          vals.forEach(function (val) {
            var prefix = search ? '&' : exclude_question_mark ? '' : '?';
            search += "".concat(prefix).concat(key, "=").concat(val);
          });
        });
        return search;
      }
    }]);
    return URLSearchParams;
  }();
  try {
    if (module instanceof Object) module.exports = {
      URL: URL,
      URLSearchParams: URLSearchParams
    };
  } catch (e) {}
  try {
    if (window instanceof Object) window.jsURL = URL;
  } catch (e) {}
})();

//# sourceMappingURL=jsURL.js.map