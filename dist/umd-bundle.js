(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('http'), require('https'), require('url'), require('stream'), require('assert'), require('tty'), require('util'), require('fs'), require('net'), require('zlib')) :
  typeof define === 'function' && define.amd ? define(['http', 'https', 'url', 'stream', 'assert', 'tty', 'util', 'fs', 'net', 'zlib'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Loki = factory(global.require$$1$1, global.require$$2, global.require$$0$1, global.require$$3$1, global.require$$4$1, global.require$$0, global.require$$1, global.require$$3, global.require$$4, global.require$$8));
}(this, (function (require$$1$1, require$$2, require$$0$1, require$$3$1, require$$4$1, require$$0, require$$1, require$$3, require$$4, require$$8) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
  var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
  var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
  var require$$3__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$3$1);
  var require$$4__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$4$1);
  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
  var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
  var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
  var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
  var require$$8__default = /*#__PURE__*/_interopDefaultLegacy(require$$8);

  var axios$2 = {exports: {}};

  var bind$2 = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };

  var bind$1 = bind$2;

  /*global toString:true*/

  // utils is a library of generic helper functions non-specific to axios

  var toString = Object.prototype.toString;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
    return toString.call(val) === '[object Array]';
  }

  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined(val) {
    return typeof val === 'undefined';
  }

  /**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
      && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
  }

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
  }

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber(val) {
    return typeof val === 'number';
  }

  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject(val) {
    return val !== null && typeof val === 'object';
  }

  /**
   * Determine if a value is a plain Object
   *
   * @param {Object} val The value to test
   * @return {boolean} True if value is a plain Object, otherwise false
   */
  function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
      return false;
    }

    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }

  /**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  function isDate(val) {
    return toString.call(val) === '[object Date]';
  }

  /**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  function isFile(val) {
    return toString.call(val) === '[object File]';
  }

  /**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  function isBlob(val) {
    return toString.call(val) === '[object Blob]';
  }

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }

  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
  }

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                             navigator.product === 'NativeScript' ||
                                             navigator.product === 'NS')) {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
  }

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind$1(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   * @return {string} content value without BOM
   */
  function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  }

  var utils$e = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM
  };

  var utils$d = utils$e;

  function encode(val) {
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  var buildURL$3 = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils$d.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];

      utils$d.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils$d.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils$d.forEach(val, function parseValue(v) {
          if (utils$d.isDate(v)) {
            v = v.toISOString();
          } else if (utils$d.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + '=' + encode(v));
        });
      });

      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  var utils$c = utils$e;

  function InterceptorManager$1() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager$1.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager$1.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager$1.prototype.forEach = function forEach(fn) {
    utils$c.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager$1;

  var utils$b = utils$e;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  var transformData$1 = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    utils$b.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });

    return data;
  };

  var isCancel$1 = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };

  var utils$a = utils$e;

  var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
    utils$a.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  /**
   * Update an Error with the specified config, error code, and response.
   *
   * @param {Error} error The error to update.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The error.
   */
  var enhanceError$2 = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }

    error.request = request;
    error.response = response;
    error.isAxiosError = true;

    error.toJSON = function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code
      };
    };
    return error;
  };

  var enhanceError$1 = enhanceError$2;

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  var createError$3 = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError$1(error, config, code, request, response);
  };

  var createError$2 = createError$3;

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */
  var settle$2 = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError$2(
        'Request failed with status code ' + response.status,
        response.config,
        null,
        response.request,
        response
      ));
    }
  };

  var utils$9 = utils$e;

  var cookies$1 = (
    utils$9.isStandardBrowserEnv() ?

    // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));

            if (utils$9.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }

            if (utils$9.isString(path)) {
              cookie.push('path=' + path);
            }

            if (utils$9.isString(domain)) {
              cookie.push('domain=' + domain);
            }

            if (secure === true) {
              cookie.push('secure');
            }

            document.cookie = cookie.join('; ');
          },

          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },

          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() :

    // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() { return null; },
          remove: function remove() {}
        };
      })()
  );

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  var isAbsoluteURL$1 = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  };

  var isAbsoluteURL = isAbsoluteURL$1;
  var combineURLs = combineURLs$1;

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   * @returns {string} The combined full path
   */
  var buildFullPath$2 = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };

  var utils$8 = utils$e;

  // Headers whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  var ignoreDuplicateOf = [
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ];

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders$1 = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) { return parsed; }

    utils$8.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils$8.trim(line.substr(0, i)).toLowerCase();
      val = utils$8.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });

    return parsed;
  };

  var utils$7 = utils$e;

  var isURLSameOrigin$1 = (
    utils$7.isStandardBrowserEnv() ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;

        /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
        function resolveURL(url) {
          var href = url;

          if (msie) {
          // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href);

          // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);

        /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
        return function isURLSameOrigin(requestURL) {
          var parsed = (utils$7.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
        };
      })() :

    // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })()
  );

  var utils$6 = utils$e;
  var settle$1 = settle$2;
  var cookies = cookies$1;
  var buildURL$2 = buildURL$3;
  var buildFullPath$1 = buildFullPath$2;
  var parseHeaders = parseHeaders$1;
  var isURLSameOrigin = isURLSameOrigin$1;
  var createError$1 = createError$3;

  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;

      if (utils$6.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest();

      // HTTP basic authentication
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }

      var fullPath = buildFullPath$1(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL$2(fullPath, config.params, config.paramsSerializer), true);

      // Set the request timeout in MS
      request.timeout = config.timeout;

      // Listen for ready state
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }

        // Prepare the response
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };

        settle$1(resolve, reject, response);

        // Clean up request
        request = null;
      };

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(createError$1('Request aborted', config, 'ECONNABORTED', request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError$1('Network Error', config, null, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError$1(timeoutErrorMessage, config, 'ECONNABORTED',
          request));

        // Clean up request
        request = null;
      };

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.
      if (utils$6.isStandardBrowserEnv()) {
        // Add xsrf header
        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils$6.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      }

      // Add withCredentials to request if needed
      if (!utils$6.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }

      // Add responseType to request if needed
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }

      // Handle progress if needed
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }

      // Not all browsers support upload events
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }

          request.abort();
          reject(cancel);
          // Clean up request
          request = null;
        });
      }

      if (!requestData) {
        requestData = null;
      }

      // Send the request
      request.send(requestData);
    });
  };

  var followRedirects = {exports: {}};

  var src = {exports: {}};

  var browser$1 = {exports: {}};

  var debug$2 = {exports: {}};

  /**
   * Helpers.
   */

  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    if (ms >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (ms >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (ms >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (ms >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    return plural(ms, d, 'day') ||
      plural(ms, h, 'hour') ||
      plural(ms, m, 'minute') ||
      plural(ms, s, 'second') ||
      ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }
    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  (function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms;

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  exports.formatters = {};

  /**
   * Previous log timestamp.
   */

  var prevTime;

  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0, i;

    for (i in namespace) {
      hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {

    function debug() {
      // disabled?
      if (!debug.enabled) return;

      var self = debug;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // turn the `arguments` into a proper Array
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting (colors, etc.)
      exports.formatArgs.call(self, args);

      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);

    // env-specific initialization logic for debug instances
    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    return debug;
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    exports.names = [];
    exports.skips = [];

    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (var i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
  }(debug$2, debug$2.exports));

  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  (function (module, exports) {
  exports = module.exports = debug$2.exports;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome
                 && 'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : localstorage();

  /**
   * Colors.
   */

  exports.colors = [
    'lightseagreen',
    'forestgreen',
    'goldenrod',
    'dodgerblue',
    'darkorchid',
    'crimson'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
      return true;
    }

    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
      // is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
      // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
      // double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };


  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '')
      + this.namespace
      + (useColors ? ' %c' : ' ')
      + args[0]
      + (useColors ? '%c ' : ' ')
      + '+' + exports.humanize(this.diff);

    if (!useColors) return;

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === typeof console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch(e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch(e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
  }(browser$1, browser$1.exports));

  var node = {exports: {}};

  /**
   * Module dependencies.
   */

  (function (module, exports) {
  var tty = require$$0__default['default'];
  var util = require$$1__default['default'];

  /**
   * This is the Node.js implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$2.exports;
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;

  /**
   * Colors.
   */

  exports.colors = [6, 2, 3, 4, 5, 1];

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(function (key) {
    return /^debug_/i.test(key);
  }).reduce(function (obj, key) {
    // camel-case
    var prop = key
      .substring(6)
      .toLowerCase()
      .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

    // coerce string value into JS value
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === 'null') val = null;
    else val = Number(val);

    obj[prop] = val;
    return obj;
  }, {});

  /**
   * The file descriptor to write the `debug()` calls to.
   * Set the `DEBUG_FD` env variable to override with another value. i.e.:
   *
   *   $ DEBUG_FD=3 node script.js 3>debug.log
   */

  var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

  if (1 !== fd && 2 !== fd) {
    util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')();
  }

  var stream = 1 === fd ? process.stdout :
               2 === fd ? process.stderr :
               createWritableStdioStream(fd);

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts
      ? Boolean(exports.inspectOpts.colors)
      : tty.isatty(fd);
  }

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts)
      .split('\n').map(function(str) {
        return str.trim()
      }).join(' ');
  };

  /**
   * Map %o to `util.inspect()`, allowing multiple lines if needed.
   */

  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var name = this.namespace;
    var useColors = this.useColors;

    if (useColors) {
      var c = this.color;
      var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

      args[0] = prefix + args[0].split('\n').join('\n' + prefix);
      args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
    } else {
      args[0] = new Date().toUTCString()
        + ' ' + name + ' ' + args[0];
    }
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to `stream`.
   */

  function log() {
    return stream.write(util.format.apply(util, arguments) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    if (null == namespaces) {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    return process.env.DEBUG;
  }

  /**
   * Copied from `node/src/node.js`.
   *
   * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
   * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
   */

  function createWritableStdioStream (fd) {
    var stream;
    var tty_wrap = process.binding('tty_wrap');

    // Note stream._type is used for test-module-load-list.js

    switch (tty_wrap.guessHandleType(fd)) {
      case 'TTY':
        stream = new tty.WriteStream(fd);
        stream._type = 'tty';

        // Hack to have stream not keep the event loop alive.
        // See https://github.com/joyent/node/issues/1726
        if (stream._handle && stream._handle.unref) {
          stream._handle.unref();
        }
        break;

      case 'FILE':
        var fs = require$$3__default['default'];
        stream = new fs.SyncWriteStream(fd, { autoClose: false });
        stream._type = 'fs';
        break;

      case 'PIPE':
      case 'TCP':
        var net = require$$4__default['default'];
        stream = new net.Socket({
          fd: fd,
          readable: false,
          writable: true
        });

        // FIXME Should probably have an option in net.Socket to create a
        // stream from an existing fd which is writable only. But for now
        // we'll just add this hack and set the `readable` member to false.
        // Test: ./node test/fixtures/echo.js < /etc/passwd
        stream.readable = false;
        stream.read = null;
        stream._type = 'pipe';

        // FIXME Hack to have stream not keep the event loop alive.
        // See https://github.com/joyent/node/issues/1726
        if (stream._handle && stream._handle.unref) {
          stream._handle.unref();
        }
        break;

      default:
        // Probably an error on in uv_guess_handle()
        throw new Error('Implement me. Unknown stream file type!');
    }

    // For supporting legacy API we put the FD here.
    stream.fd = fd;

    stream._isStdio = true;

    return stream;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init (debug) {
    debug.inspectOpts = {};

    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }

  /**
   * Enable namespaces listed in `process.env.DEBUG` initially.
   */

  exports.enable(load());
  }(node, node.exports));

  /**
   * Detect Electron renderer process, which is node, but we should
   * treat as a browser.
   */

  if (typeof process !== 'undefined' && process.type === 'renderer') {
    src.exports = browser$1.exports;
  } else {
    src.exports = node.exports;
  }

  var debug$1;

  var debug_1 = function () {
    if (!debug$1) {
      try {
        /* eslint global-require: off */
        debug$1 = src.exports("follow-redirects");
      }
      catch (error) {
        debug$1 = function () { /* */ };
      }
    }
    debug$1.apply(null, arguments);
  };

  var url$1 = require$$0__default$1['default'];
  var URL = url$1.URL;
  var http$1 = require$$1__default$1['default'];
  var https$1 = require$$2__default['default'];
  var Writable = require$$3__default$1['default'].Writable;
  var assert = require$$4__default$1['default'];
  var debug = debug_1;

  // Create handlers that pass events from native requests
  var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
  var eventHandlers = Object.create(null);
  events.forEach(function (event) {
    eventHandlers[event] = function (arg1, arg2, arg3) {
      this._redirectable.emit(event, arg1, arg2, arg3);
    };
  });

  // Error types with codes
  var RedirectionError = createErrorType(
    "ERR_FR_REDIRECTION_FAILURE",
    ""
  );
  var TooManyRedirectsError = createErrorType(
    "ERR_FR_TOO_MANY_REDIRECTS",
    "Maximum number of redirects exceeded"
  );
  var MaxBodyLengthExceededError = createErrorType(
    "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
    "Request body larger than maxBodyLength limit"
  );
  var WriteAfterEndError = createErrorType(
    "ERR_STREAM_WRITE_AFTER_END",
    "write after end"
  );

  // An HTTP(S) request that can be redirected
  function RedirectableRequest(options, responseCallback) {
    // Initialize the request
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];

    // Attach a callback if passed
    if (responseCallback) {
      this.on("response", responseCallback);
    }

    // React to responses of native requests
    var self = this;
    this._onNativeResponse = function (response) {
      self._processResponse(response);
    };

    // Perform the first request
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);

  RedirectableRequest.prototype.abort = function () {
    abortRequest(this._currentRequest);
    this.emit("abort");
  };

  // Writes buffered data to the current native request
  RedirectableRequest.prototype.write = function (data, encoding, callback) {
    // Writing is not allowed if end has been called
    if (this._ending) {
      throw new WriteAfterEndError();
    }

    // Validate input and shift parameters if necessary
    if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
      throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Ignore empty buffers, since writing them doesn't invoke the callback
    // https://github.com/nodejs/node/issues/22066
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    // Only write when we don't exceed the maximum body length
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({ data: data, encoding: encoding });
      this._currentRequest.write(data, encoding, callback);
    }
    // Error when we exceed the maximum body length
    else {
      this.emit("error", new MaxBodyLengthExceededError());
      this.abort();
    }
  };

  // Ends the current native request
  RedirectableRequest.prototype.end = function (data, encoding, callback) {
    // Shift parameters if necessary
    if (typeof data === "function") {
      callback = data;
      data = encoding = null;
    }
    else if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Write data if needed and end
    if (!data) {
      this._ended = this._ending = true;
      this._currentRequest.end(null, null, callback);
    }
    else {
      var self = this;
      var currentRequest = this._currentRequest;
      this.write(data, encoding, function () {
        self._ended = true;
        currentRequest.end(null, null, callback);
      });
      this._ending = true;
    }
  };

  // Sets a header value on the current native request
  RedirectableRequest.prototype.setHeader = function (name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };

  // Clears a header value on the current native request
  RedirectableRequest.prototype.removeHeader = function (name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };

  // Global timeout for all underlying requests
  RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
    var self = this;
    if (callback) {
      this.on("timeout", callback);
    }

    function destroyOnTimeout(socket) {
      socket.setTimeout(msecs);
      socket.removeListener("timeout", socket.destroy);
      socket.addListener("timeout", socket.destroy);
    }

    // Sets up a timer to trigger a timeout event
    function startTimer(socket) {
      if (self._timeout) {
        clearTimeout(self._timeout);
      }
      self._timeout = setTimeout(function () {
        self.emit("timeout");
        clearTimer();
      }, msecs);
      destroyOnTimeout(socket);
    }

    // Prevent a timeout from triggering
    function clearTimer() {
      clearTimeout(this._timeout);
      if (callback) {
        self.removeListener("timeout", callback);
      }
      if (!this.socket) {
        self._currentRequest.removeListener("socket", startTimer);
      }
    }

    // Start the timer when the socket is opened
    if (this.socket) {
      startTimer(this.socket);
    }
    else {
      this._currentRequest.once("socket", startTimer);
    }

    this.on("socket", destroyOnTimeout);
    this.once("response", clearTimer);
    this.once("error", clearTimer);

    return this;
  };

  // Proxy all other public ClientRequest methods
  [
    "flushHeaders", "getHeader",
    "setNoDelay", "setSocketKeepAlive",
  ].forEach(function (method) {
    RedirectableRequest.prototype[method] = function (a, b) {
      return this._currentRequest[method](a, b);
    };
  });

  // Proxy all public ClientRequest properties
  ["aborted", "connection", "socket"].forEach(function (property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function () { return this._currentRequest[property]; },
    });
  });

  RedirectableRequest.prototype._sanitizeOptions = function (options) {
    // Ensure headers are always present
    if (!options.headers) {
      options.headers = {};
    }

    // Since http.request treats host as an alias of hostname,
    // but the url module interprets host as hostname plus port,
    // eliminate the host property to avoid confusion.
    if (options.host) {
      // Use hostname if set, because it has precedence
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }

    // Complete the URL object when necessary
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      }
      else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }
  };


  // Executes the next native request (initial or redirect)
  RedirectableRequest.prototype._performRequest = function () {
    // Load the native protocol
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      this.emit("error", new TypeError("Unsupported protocol " + protocol));
      return;
    }

    // If specified, use the agent corresponding to the protocol
    // (HTTP and HTTPS use different types of agents)
    if (this._options.agents) {
      var scheme = protocol.substr(0, protocol.length - 1);
      this._options.agent = this._options.agents[scheme];
    }

    // Create the native request
    var request = this._currentRequest =
          nativeProtocol.request(this._options, this._onNativeResponse);
    this._currentUrl = url$1.format(this._options);

    // Set up event handlers
    request._redirectable = this;
    for (var e = 0; e < events.length; e++) {
      request.on(events[e], eventHandlers[events[e]]);
    }

    // End a redirected request
    // (The first request must be ended explicitly with RedirectableRequest#end)
    if (this._isRedirect) {
      // Write the request entity and end.
      var i = 0;
      var self = this;
      var buffers = this._requestBodyBuffers;
      (function writeNext(error) {
        // Only write if this request has not been redirected yet
        /* istanbul ignore else */
        if (request === self._currentRequest) {
          // Report any write errors
          /* istanbul ignore if */
          if (error) {
            self.emit("error", error);
          }
          // Write the next buffer if there are still left
          else if (i < buffers.length) {
            var buffer = buffers[i++];
            /* istanbul ignore else */
            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          }
          // End the request if `end` has been called on us
          else if (self._ended) {
            request.end();
          }
        }
      }());
    }
  };

  // Processes a response from the current native request
  RedirectableRequest.prototype._processResponse = function (response) {
    // Store the redirected response
    var statusCode = response.statusCode;
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode: statusCode,
      });
    }

    // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
    // that further action needs to be taken by the user agent in order to
    // fulfill the request. If a Location header field is provided,
    // the user agent MAY automatically redirect its request to the URI
    // referenced by the Location field value,
    // even if the specific status code is not understood.
    var location = response.headers.location;
    if (location && this._options.followRedirects !== false &&
        statusCode >= 300 && statusCode < 400) {
      // Abort the current request
      abortRequest(this._currentRequest);
      // Discard the remainder of the response to avoid waiting for data
      response.destroy();

      // RFC7231§6.4: A client SHOULD detect and intervene
      // in cyclical redirections (i.e., "infinite" redirection loops).
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }

      // RFC7231§6.4: Automatic redirection needs to done with
      // care for methods not known to be safe, […]
      // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
      // the request method from POST to GET for the subsequent request.
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
          // RFC7231§6.4.4: The 303 (See Other) status code indicates that
          // the server is redirecting the user agent to a different resource […]
          // A user agent can perform a retrieval request targeting that URI
          // (a GET or HEAD request if using HTTP) […]
          (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        // Drop a possible entity and headers related to it
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }

      // Drop the Host header, as the redirect might lead to a different host
      var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
        url$1.parse(this._currentUrl).hostname;

      // Create the redirected request
      var redirectUrl = url$1.resolve(this._currentUrl, location);
      debug("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url$1.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);

      // Drop the Authorization header if redirecting to another host
      if (redirectUrlParts.hostname !== previousHostName) {
        removeMatchingHeaders(/^authorization$/i, this._options.headers);
      }

      // Evaluate the beforeRedirect callback
      if (typeof this._options.beforeRedirect === "function") {
        var responseDetails = { headers: response.headers };
        try {
          this._options.beforeRedirect.call(null, this._options, responseDetails);
        }
        catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }

      // Perform the redirected request
      try {
        this._performRequest();
      }
      catch (cause) {
        var error = new RedirectionError("Redirected request failed: " + cause.message);
        error.cause = cause;
        this.emit("error", error);
      }
    }
    else {
      // The response is not a redirect; return it as-is
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);

      // Clean up
      this._requestBodyBuffers = [];
    }
  };

  // Wraps the key/value object of protocols with redirect functionality
  function wrap(protocols) {
    // Default settings
    var exports = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024,
    };

    // Wrap each protocol
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function (scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

      // Executes a request, following redirects
      function request(input, options, callback) {
        // Parse parameters
        if (typeof input === "string") {
          var urlStr = input;
          try {
            input = urlToOptions(new URL(urlStr));
          }
          catch (err) {
            /* istanbul ignore next */
            input = url$1.parse(urlStr);
          }
        }
        else if (URL && (input instanceof URL)) {
          input = urlToOptions(input);
        }
        else {
          callback = options;
          options = input;
          input = { protocol: protocol };
        }
        if (typeof options === "function") {
          callback = options;
          options = null;
        }

        // Set defaults
        options = Object.assign({
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, input, options);
        options.nativeProtocols = nativeProtocols;

        assert.equal(options.protocol, protocol, "protocol mismatch");
        debug("options", options);
        return new RedirectableRequest(options, callback);
      }

      // Executes a GET request, following redirects
      function get(input, options, callback) {
        var wrappedRequest = wrappedProtocol.request(input, options, callback);
        wrappedRequest.end();
        return wrappedRequest;
      }

      // Expose the properties on the wrapped protocol
      Object.defineProperties(wrappedProtocol, {
        request: { value: request, configurable: true, enumerable: true, writable: true },
        get: { value: get, configurable: true, enumerable: true, writable: true },
      });
    });
    return exports;
  }

  /* istanbul ignore next */
  function noop() { /* empty */ }

  // from https://github.com/nodejs/node/blob/master/lib/internal/url.js
  function urlToOptions(urlObject) {
    var options = {
      protocol: urlObject.protocol,
      hostname: urlObject.hostname.startsWith("[") ?
        /* istanbul ignore next */
        urlObject.hostname.slice(1, -1) :
        urlObject.hostname,
      hash: urlObject.hash,
      search: urlObject.search,
      pathname: urlObject.pathname,
      path: urlObject.pathname + urlObject.search,
      href: urlObject.href,
    };
    if (urlObject.port !== "") {
      options.port = Number(urlObject.port);
    }
    return options;
  }

  function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for (var header in headers) {
      if (regex.test(header)) {
        lastValue = headers[header];
        delete headers[header];
      }
    }
    return lastValue;
  }

  function createErrorType(code, defaultMessage) {
    function CustomError(message) {
      Error.captureStackTrace(this, this.constructor);
      this.message = message || defaultMessage;
    }
    CustomError.prototype = new Error();
    CustomError.prototype.constructor = CustomError;
    CustomError.prototype.name = "Error [" + code + "]";
    CustomError.prototype.code = code;
    return CustomError;
  }

  function abortRequest(request) {
    for (var e = 0; e < events.length; e++) {
      request.removeListener(events[e], eventHandlers[events[e]]);
    }
    request.on("error", noop);
    request.abort();
  }

  // Exports
  followRedirects.exports = wrap({ http: http$1, https: https$1 });
  followRedirects.exports.wrap = wrap;

  var _from = "axios";
  var _id = "axios@0.21.1";
  var _inBundle = false;
  var _integrity = "sha512-dKQiRHxGD9PPRIUNIWvZhPTPpl1rf/OxTYKsqKUDjBwYylTvV7SjSHJb9ratfyzM6wCdLCOYLzs73qpg5c4iGA==";
  var _location = "/axios";
  var _phantomChildren = {
  };
  var _requested = {
  	type: "tag",
  	registry: true,
  	raw: "axios",
  	name: "axios",
  	escapedName: "axios",
  	rawSpec: "",
  	saveSpec: null,
  	fetchSpec: "latest"
  };
  var _requiredBy = [
  	"#USER",
  	"/"
  ];
  var _resolved = "https://registry.npmjs.org/axios/-/axios-0.21.1.tgz";
  var _shasum = "22563481962f4d6bde9a76d516ef0e5d3c09b2b8";
  var _spec = "axios";
  var _where = "/Users/andrewwaller/Documents/GitHub/loki-dev-client";
  var author = {
  	name: "Matt Zabriskie"
  };
  var browser = {
  	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
  };
  var bugs = {
  	url: "https://github.com/axios/axios/issues"
  };
  var bundleDependencies = false;
  var bundlesize = [
  	{
  		path: "./dist/axios.min.js",
  		threshold: "5kB"
  	}
  ];
  var dependencies = {
  	"follow-redirects": "^1.10.0"
  };
  var deprecated = false;
  var description = "Promise based HTTP client for the browser and node.js";
  var devDependencies = {
  	bundlesize: "^0.17.0",
  	coveralls: "^3.0.0",
  	"es6-promise": "^4.2.4",
  	grunt: "^1.0.2",
  	"grunt-banner": "^0.6.0",
  	"grunt-cli": "^1.2.0",
  	"grunt-contrib-clean": "^1.1.0",
  	"grunt-contrib-watch": "^1.0.0",
  	"grunt-eslint": "^20.1.0",
  	"grunt-karma": "^2.0.0",
  	"grunt-mocha-test": "^0.13.3",
  	"grunt-ts": "^6.0.0-beta.19",
  	"grunt-webpack": "^1.0.18",
  	"istanbul-instrumenter-loader": "^1.0.0",
  	"jasmine-core": "^2.4.1",
  	karma: "^1.3.0",
  	"karma-chrome-launcher": "^2.2.0",
  	"karma-coverage": "^1.1.1",
  	"karma-firefox-launcher": "^1.1.0",
  	"karma-jasmine": "^1.1.1",
  	"karma-jasmine-ajax": "^0.1.13",
  	"karma-opera-launcher": "^1.0.0",
  	"karma-safari-launcher": "^1.0.0",
  	"karma-sauce-launcher": "^1.2.0",
  	"karma-sinon": "^1.0.5",
  	"karma-sourcemap-loader": "^0.3.7",
  	"karma-webpack": "^1.7.0",
  	"load-grunt-tasks": "^3.5.2",
  	minimist: "^1.2.0",
  	mocha: "^5.2.0",
  	sinon: "^4.5.0",
  	typescript: "^2.8.1",
  	"url-search-params": "^0.10.0",
  	webpack: "^1.13.1",
  	"webpack-dev-server": "^1.14.1"
  };
  var homepage = "https://github.com/axios/axios";
  var jsdelivr = "dist/axios.min.js";
  var keywords = [
  	"xhr",
  	"http",
  	"ajax",
  	"promise",
  	"node"
  ];
  var license = "MIT";
  var main = "index.js";
  var name = "axios";
  var repository = {
  	type: "git",
  	url: "git+https://github.com/axios/axios.git"
  };
  var scripts = {
  	build: "NODE_ENV=production grunt build",
  	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  	examples: "node ./examples/server.js",
  	fix: "eslint --fix lib/**/*.js",
  	postversion: "git push && git push --tags",
  	preversion: "npm test",
  	start: "node ./sandbox/server.js",
  	test: "grunt test && bundlesize",
  	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"
  };
  var typings = "./index.d.ts";
  var unpkg = "dist/axios.min.js";
  var version = "0.21.1";
  var require$$9 = {
  	_from: _from,
  	_id: _id,
  	_inBundle: _inBundle,
  	_integrity: _integrity,
  	_location: _location,
  	_phantomChildren: _phantomChildren,
  	_requested: _requested,
  	_requiredBy: _requiredBy,
  	_resolved: _resolved,
  	_shasum: _shasum,
  	_spec: _spec,
  	_where: _where,
  	author: author,
  	browser: browser,
  	bugs: bugs,
  	bundleDependencies: bundleDependencies,
  	bundlesize: bundlesize,
  	dependencies: dependencies,
  	deprecated: deprecated,
  	description: description,
  	devDependencies: devDependencies,
  	homepage: homepage,
  	jsdelivr: jsdelivr,
  	keywords: keywords,
  	license: license,
  	main: main,
  	name: name,
  	repository: repository,
  	scripts: scripts,
  	typings: typings,
  	unpkg: unpkg,
  	version: version
  };

  var utils$5 = utils$e;
  var settle = settle$2;
  var buildFullPath = buildFullPath$2;
  var buildURL$1 = buildURL$3;
  var http = require$$1__default$1['default'];
  var https = require$$2__default['default'];
  var httpFollow = followRedirects.exports.http;
  var httpsFollow = followRedirects.exports.https;
  var url = require$$0__default$1['default'];
  var zlib = require$$8__default['default'];
  var pkg = require$$9;
  var createError = createError$3;
  var enhanceError = enhanceError$2;

  var isHttps = /https:?/;

  /**
   *
   * @param {http.ClientRequestArgs} options
   * @param {AxiosProxyConfig} proxy
   * @param {string} location
   */
  function setProxy(options, proxy, location) {
    options.hostname = proxy.host;
    options.host = proxy.host;
    options.port = proxy.port;
    options.path = location;

    // Basic proxy authorization
    if (proxy.auth) {
      var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
      options.headers['Proxy-Authorization'] = 'Basic ' + base64;
    }

    // If a proxy is used, any redirects must also pass through the proxy
    options.beforeRedirect = function beforeRedirect(redirection) {
      redirection.headers.host = redirection.host;
      setProxy(redirection, proxy, redirection.href);
    };
  }

  /*eslint consistent-return:0*/
  var http_1 = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
      var resolve = function resolve(value) {
        resolvePromise(value);
      };
      var reject = function reject(value) {
        rejectPromise(value);
      };
      var data = config.data;
      var headers = config.headers;

      // Set User-Agent (required by some servers)
      // Only set header if it hasn't been set in config
      // See https://github.com/axios/axios/issues/69
      if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'axios/' + pkg.version;
      }

      if (data && !utils$5.isStream(data)) {
        if (Buffer.isBuffer(data)) ; else if (utils$5.isArrayBuffer(data)) {
          data = Buffer.from(new Uint8Array(data));
        } else if (utils$5.isString(data)) {
          data = Buffer.from(data, 'utf-8');
        } else {
          return reject(createError(
            'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
            config
          ));
        }

        // Add Content-Length header if data exists
        headers['Content-Length'] = data.length;
      }

      // HTTP basic authentication
      var auth = undefined;
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        auth = username + ':' + password;
      }

      // Parse url
      var fullPath = buildFullPath(config.baseURL, config.url);
      var parsed = url.parse(fullPath);
      var protocol = parsed.protocol || 'http:';

      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(':');
        var urlUsername = urlAuth[0] || '';
        var urlPassword = urlAuth[1] || '';
        auth = urlUsername + ':' + urlPassword;
      }

      if (auth) {
        delete headers.Authorization;
      }

      var isHttpsRequest = isHttps.test(protocol);
      var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

      var options = {
        path: buildURL$1(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
        method: config.method.toUpperCase(),
        headers: headers,
        agent: agent,
        agents: { http: config.httpAgent, https: config.httpsAgent },
        auth: auth
      };

      if (config.socketPath) {
        options.socketPath = config.socketPath;
      } else {
        options.hostname = parsed.hostname;
        options.port = parsed.port;
      }

      var proxy = config.proxy;
      if (!proxy && proxy !== false) {
        var proxyEnv = protocol.slice(0, -1) + '_proxy';
        var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = url.parse(proxyUrl);
          var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
          var shouldProxy = true;

          if (noProxyEnv) {
            var noProxy = noProxyEnv.split(',').map(function trim(s) {
              return s.trim();
            });

            shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
              if (!proxyElement) {
                return false;
              }
              if (proxyElement === '*') {
                return true;
              }
              if (proxyElement[0] === '.' &&
                  parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                return true;
              }

              return parsed.hostname === proxyElement;
            });
          }

          if (shouldProxy) {
            proxy = {
              host: parsedProxyUrl.hostname,
              port: parsedProxyUrl.port,
              protocol: parsedProxyUrl.protocol
            };

            if (parsedProxyUrl.auth) {
              var proxyUrlAuth = parsedProxyUrl.auth.split(':');
              proxy.auth = {
                username: proxyUrlAuth[0],
                password: proxyUrlAuth[1]
              };
            }
          }
        }
      }

      if (proxy) {
        options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
        setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
      }

      var transport;
      var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttpsProxy ? https : http;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        transport = isHttpsProxy ? httpsFollow : httpFollow;
      }

      if (config.maxBodyLength > -1) {
        options.maxBodyLength = config.maxBodyLength;
      }

      // Create the request
      var req = transport.request(options, function handleResponse(res) {
        if (req.aborted) return;

        // uncompress the response body transparently if required
        var stream = res;

        // return the last request in case of redirects
        var lastRequest = res.req || req;


        // if no content, is HEAD request or decompress disabled we should not decompress
        if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
          switch (res.headers['content-encoding']) {
          /*eslint default-case:0*/
          case 'gzip':
          case 'compress':
          case 'deflate':
          // add the unzipper to the body stream processing pipeline
            stream = stream.pipe(zlib.createUnzip());

            // remove the content-encoding in order to not confuse downstream operations
            delete res.headers['content-encoding'];
            break;
          }
        }

        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config: config,
          request: lastRequest
        };

        if (config.responseType === 'stream') {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          stream.on('data', function handleStreamData(chunk) {
            responseBuffer.push(chunk);

            // make sure the content length is not over the maxContentLength if specified
            if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
              stream.destroy();
              reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
                config, null, lastRequest));
            }
          });

          stream.on('error', function handleStreamError(err) {
            if (req.aborted) return;
            reject(enhanceError(err, config, null, lastRequest));
          });

          stream.on('end', function handleStreamEnd() {
            var responseData = Buffer.concat(responseBuffer);
            if (config.responseType !== 'arraybuffer') {
              responseData = responseData.toString(config.responseEncoding);
              if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                responseData = utils$5.stripBOM(responseData);
              }
            }

            response.data = responseData;
            settle(resolve, reject, response);
          });
        }
      });

      // Handle errors
      req.on('error', function handleRequestError(err) {
        if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
        reject(enhanceError(err, config, null, req));
      });

      // Handle request timeout
      if (config.timeout) {
        // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
        // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
        // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
        // And then these socket which be hang up will devoring CPU little by little.
        // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
        req.setTimeout(config.timeout, function handleRequestTimeout() {
          req.abort();
          reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
        });
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (req.aborted) return;

          req.abort();
          reject(cancel);
        });
      }

      // Send the request
      if (utils$5.isStream(data)) {
        data.on('error', function handleStreamError(err) {
          reject(enhanceError(err, config, null, req));
        }).pipe(req);
      } else {
        req.end(data);
      }
    });
  };

  var utils$4 = utils$e;
  var normalizeHeaderName = normalizeHeaderName$1;

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (!utils$4.isUndefined(headers) && utils$4.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = xhr;
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // For node use HTTP adapter
      adapter = http_1;
    }
    return adapter;
  }

  var defaults$2 = {
    adapter: getDefaultAdapter(),

    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');
      if (utils$4.isFormData(data) ||
        utils$4.isArrayBuffer(data) ||
        utils$4.isBuffer(data) ||
        utils$4.isStream(data) ||
        utils$4.isFile(data) ||
        utils$4.isBlob(data)
      ) {
        return data;
      }
      if (utils$4.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$4.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }
      if (utils$4.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }
      return data;
    }],

    transformResponse: [function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) { /* Ignore */ }
      }
      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,
    maxBodyLength: -1,

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };

  defaults$2.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  };

  utils$4.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults$2.headers[method] = {};
  });

  utils$4.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults$2.headers[method] = utils$4.merge(DEFAULT_CONTENT_TYPE);
  });

  var defaults_1 = defaults$2;

  var utils$3 = utils$e;
  var transformData = transformData$1;
  var isCancel = isCancel$1;
  var defaults$1 = defaults_1;

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  var dispatchRequest$1 = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData(
      config.data,
      config.headers,
      config.transformRequest
    );

    // Flatten headers
    config.headers = utils$3.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers
    );

    utils$3.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );

    var adapter = config.adapter || defaults$1.adapter;

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse
      );

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData(
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          );
        }
      }

      return Promise.reject(reason);
    });
  };

  var utils$2 = utils$e;

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   * @returns {Object} New object resulting from merging config2 to config1
   */
  var mergeConfig$2 = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};

    var valueFromConfig2Keys = ['url', 'method', 'data'];
    var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
    var defaultToConfig2Keys = [
      'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
      'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
      'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
      'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
      'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
    ];
    var directMergeKeys = ['validateStatus'];

    function getMergedValue(target, source) {
      if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
        return utils$2.merge(target, source);
      } else if (utils$2.isPlainObject(source)) {
        return utils$2.merge({}, source);
      } else if (utils$2.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    function mergeDeepProperties(prop) {
      if (!utils$2.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (!utils$2.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    }

    utils$2.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
      if (!utils$2.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(undefined, config2[prop]);
      }
    });

    utils$2.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

    utils$2.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
      if (!utils$2.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(undefined, config2[prop]);
      } else if (!utils$2.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    });

    utils$2.forEach(directMergeKeys, function merge(prop) {
      if (prop in config2) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    });

    var axiosKeys = valueFromConfig2Keys
      .concat(mergeDeepPropertiesKeys)
      .concat(defaultToConfig2Keys)
      .concat(directMergeKeys);

    var otherKeys = Object
      .keys(config1)
      .concat(Object.keys(config2))
      .filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });

    utils$2.forEach(otherKeys, mergeDeepProperties);

    return config;
  };

  var utils$1 = utils$e;
  var buildURL = buildURL$3;
  var InterceptorManager = InterceptorManager_1;
  var dispatchRequest = dispatchRequest$1;
  var mergeConfig$1 = mergeConfig$2;

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios$1(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios$1.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }

    config = mergeConfig$1(this.defaults, config);

    // Set config.method
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    }

    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  };

  Axios$1.prototype.getUri = function getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
  };

  // Provide aliases for supported request methods
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios$1.prototype[method] = function(url, config) {
      return this.request(mergeConfig$1(config || {}, {
        method: method,
        url: url,
        data: (config || {}).data
      }));
    };
  });

  utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    Axios$1.prototype[method] = function(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });

  var Axios_1 = Axios$1;

  /**
   * A `Cancel` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */
  function Cancel$1(message) {
    this.message = message;
  }

  Cancel$1.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };

  Cancel$1.prototype.__CANCEL__ = true;

  var Cancel_1 = Cancel$1;

  var Cancel = Cancel_1;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new Cancel(message);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };

  var CancelToken_1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */
  var spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  var isAxiosError = function isAxiosError(payload) {
    return (typeof payload === 'object') && (payload.isAxiosError === true);
  };

  var utils = utils$e;
  var bind = bind$2;
  var Axios = Axios_1;
  var mergeConfig = mergeConfig$2;
  var defaults = defaults_1;

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    return instance;
  }

  // Create the default instance to be exported
  var axios$1 = createInstance(defaults);

  // Expose Axios class to allow class inheritance
  axios$1.Axios = Axios;

  // Factory for creating new instances
  axios$1.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
  };

  // Expose Cancel & CancelToken
  axios$1.Cancel = Cancel_1;
  axios$1.CancelToken = CancelToken_1;
  axios$1.isCancel = isCancel$1;

  // Expose all/spread
  axios$1.all = function all(promises) {
    return Promise.all(promises);
  };
  axios$1.spread = spread;

  // Expose isAxiosError
  axios$1.isAxiosError = isAxiosError;

  axios$2.exports = axios$1;

  // Allow use of default import syntax in TypeScript
  axios$2.exports.default = axios$1;

  var axios = axios$2.exports;

  /* eslint-disable class-methods-use-this */

  /**
   * @class Represents the Data API
   */
  class Data {
    /**
     * Constructs a configured instance of the Loki Data API
     * @param {Object} config Config object that was used to instantiate Loki
     * @param {string} config.baseUrl Base url for the target cloud environment
     * @param {Object} config.auth Object containing credentials for API calls to Loki
     * @param {string} config.auth.username String containing the username for all Loki API calls
     * @param {string} config.auth.password String containing the password for all Loki API calls
     * @param {Object} web Configured instance of the Loki Web module; @see module:Loki/Web
     * @param {Object} urn Configured instance of the Loki Urn module
     */
    constructor(config, web, urn) {
      this.baseUrl = config.baseUrl;
      if (config.auth) {
        this.auth = config.auth;
      }
      this.web = web;
      this.urn = urn;
    }

    loadEntity(entityUrn, viewUrn) {
      const url = this.web.dataServiceUrl(entityUrn, viewUrn);
      return axios({
        baseURL: this.baseUrl,
        method: 'GET',
        auth: this.auth || '',
        headers: {
          'Content-Type': 'application/json',
        },
        url,
      })
        .then((entity) => entity.data);
    }

    loadResource(resourceUrn, options) {
      options = options || {};
      options.queryParams = options.dataSpaceUrn ? `dataSpaceUrn=${options.dataSpaceUrn}&` : '';
      options.queryParams = `${options.queryParams}noCache=${(new Date()).getTime()}`; // prevent caching

      const url = this.web.resourceUrl(resourceUrn, options);

      return axios({
        baseURL: this.baseUrl,
        method: 'GET',
        auth: this.auth || '',
        headers: {
          'Content-Type': 'text/plain',
        },
        url,
      });
    }

    saveEntity(entityUrn, viewUrn, entityData, options) {
      options = options || {};
      options.queryParams = options.format ? `format=${options.format}` : 'format=json';

      const url = this.web.dataServiceUrl(entityUrn, viewUrn);
      return axios({
        baseURL: this.baseUrl,
        method: 'POST',
        auth: this.auth || '',
        data: typeof entityData === 'string' ? entityData : JSON.stringify(entityData),
        headers: {
          'Content-Type': 'application/json',
        },
        url,
      });
    }

    /** Delete the entity with the given urn
      * @memberof module:lokiJQuery
      * @param {string} urn the urn of the entity to be deleted
      * @param {Object} options service options
      * @param {string} options.format the format in which to return the data. "json" is the default.
      * @param {string} options.dataSpaceUrn the data space to delete the data from
      * @param {boolean} options.jsonp if true, use jsonp for cross site calls.
      * Also, options.format must be json. Default is false.  (Not sure this works for DELETE.)
      * @param {string} options.recursive if true then recusively delete all child entities.
      * Default is false.
      * @param {string} options.serviceGroupUrn use this service group to determine
      * the base of the url when connecting to another application.
      * @param {string} options.connection use this connection to determine
      * the base of the url when connecting to another application.
      * @param {string} options.urlPrefix use this prefix at the base of the url
      * in order to connect to another application. Typically you don't want
      * to hardcode this so use options.serviceGroupUrn or options.connection instead.
      * @return {Promise}
      */
    deleteEntity(entityUrn, options) {
      options = options || {};
      return this.deleteItem(entityUrn, options);
    }

    deleteItem(itemUrn, options) {
      options = options || {};
      // set query params based on other options, but don't allow caller to set options.queryParams
      options.queryParams = options.format ? `format=${options.format}` : 'format=json';

      if (options.recursive && options.recursive === true) {
        options.queryParams += '&recursive=true';
      }

      const url = this.urn.isResourceUrn(itemUrn)
        ? this.web.resourceUrl(itemUrn, options) : this.web.dataServiceUrl(itemUrn, 'urn:com:loki:core:model:api:rawData', options);

      return axios({
        baseURL: this.baseUrl,
        method: 'DELETE',
        auth: this.auth || '',
        headers: {
          'Content-Type': 'application/json',
        },
        url,
      });
    }

    /** Delete the resource with the given urn
    * @param {string} urn the urn of the resource to be deleted
    * @param {Object} options service options
    * @param {string} options.format the format in which to return the data. "json" is the default.
    * @param {string} options.dataSpaceUrn the data space to delete the data from
    * @param {boolean} options.jsonp if true, use jsonp for cross site calls.
    * Also, options.format must be json. Default is false.  (Not sure this works for DELETE.)
    =* @param {string} options.serviceGroupUrn use this service group to determine
     the base of the url when connecting to another application.
    * @param {string} options.connection use this connection to determine
     the base of the url when connecting to another application.
    * @param {string} options.urlPrefix use this prefix at the base
     of the url in order to connect to another application. Typically you
     don't want to hardcode this so use options.serviceGroupUrn or options.connection instead.
    * @return {Promise}
    */
    deleteResource(resourceUrn, options) {
      return this.deleteItem(resourceUrn, options);
    }

    // handleJsonp(promise, options) {
    //   // NOTE: auth on cross domain jsonp won't work since cross-domain jsonp cannot send headers
    //   // since it injects a script tag into the html
    //   if (options.jsonp) {
    //   // translate error message from jsonp to json if needed
    //     // promise = promise.then(function(data, statusCode, xhr) {
    //     //     return data;
    //     // }, loki.data._handleJsonpErrHandler);
    //   }
    //   return promise;
    // }

    // handleJsonpErrHandler(xhr, statusCode, statusText) {
    //   try {
    //     const json = xhr.responseText.replace(/jQuery[0-9_]+\(/g, '').replace(/\)/g, '')
    // .replace('{"results":[', '');
    //     xhr.responseJSON = JSON.parse(json);
    //   } catch (error) {
    //     console.error(error);
    //   }
    //   return xhr;
    // }

    addParamValue(name, value, paramParam, prefix) {
      if (Array.isArray(value)) {
        // This value is an array, repeat all values in the url parameter
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < value.length; j++) {
          paramParam = `${paramParam}&${prefix}${name}=${encodeURIComponent(value[j])}`;
        }
      } else {
        paramParam = `${paramParam}&${prefix}${name}=${encodeURIComponent(value)}`;
      }
      return paramParam;
    }

    addParams(params, prefix) {
      let paramParam = '';
      if (Array.isArray(params)) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < params.length; i++) {
          paramParam = this.addParamValue(params[i].name, params[i].value, paramParam, prefix);
        }
      } else {
        for (const name in params) {
          paramParam = this.addParamValue(name, params[name], paramParam, prefix);
        }
      }
      return paramParam;
    }

    hash(keys, values) {
      const hash = {};
      const vlen = (values && values.length) || 0;
      let i; let
        len;
      // eslint-disable-next-line no-plusplus
      for (i = 0, len = keys.length; i < len; ++i) {
        if (i in keys) {
          hash[keys[i]] = vlen > i && i in values ? values[i] : true;
        }
      }
      return hash;
    }

    /**
     * Gets header info for the entity or resource without retrieving the data
     * @function
     * @param {string} entityUrn the urn of the entity or resource
     * @param {string} options.format the format in which to return the data. "json" is the default.
     * @param {string} options.dataSpaceUrn the data space from which to load the data
     * @param {boolean} options.jsonp if true, use jsonp for cross site calls.
     * Also, options.format must be json. Default is false. (Not sure this works for HEAD.)
     * @return {Promise} resolving with header information
     */
    head(entityUrn, options) {
      options = options || {};
      options.queryParams = options.format ? `format=${options.format}` : 'format=json';

      if (options.dataSpaceUrn) {
        options.queryParams = `${options.queryParams}&dataSpaceUrn=${options.dataSpaceUrn}`;
      }

      const url = this.urn.isResourceUrn(entityUrn)
        ? this.web.resourceUrl(entityUrn, options) : this.web.dataServiceUrl(entityUrn, 'urn:com:loki:core:model:api:rawData', options);

      let jsonpCallback = null;
      let dataType = 'json';

      if (options.jsonp) {
        jsonpCallback = 'jsoncallback';
        dataType = 'jsonp'; // automatically adds callback param to url
      }
      // TODO: convert to axios
      // eslint-disable-next-line no-undef
      const promise = $.ajax({
        method: 'HEAD',
        contentType: 'application/json',
        url,
        dataType,
        jsonp: jsonpCallback, // name of callback param
      });
      const cPromise = promise.then((data, status, res) => {
        const lastModified = res.getResponseHeader('Last-Modified');
        return {
          'Last-Modified': lastModified,
        };
      }, this.handleJsonpErrHandler);
      return cPromise;
    }

    list(parentUrn, options) {
      options = options || {};
      // set query params based on other options, but don't allow caller to set options.queryParams
      if (options.format) {
        options.queryParams = `format=${options.format}`;
      } else {
        options.queryParams = 'format=json'; // default to json
      }

      if (options.dataSpaceUrn) {
        options.queryParams = `${options.queryParams}&dataSpaceUrn=${options.dataSpaceUrn}`;
      }

      if (options.beginIdx) {
        const { beginIdx } = options;
        options.queryParams = `${options.queryParams}&begin=${beginIdx}`;
      }

      if (options.numRequested) {
        const { numRequested } = options;
        options.queryParams = `${options.queryParams}&num=${numRequested}`;
      }

      if (options.outputView) {
        const outputView = this.web.urnToUrlParams(options.outputView);
        options.queryParams = `${options.queryParams}&outputView=${outputView}`;
      }

      options.subjectUrn = parentUrn;

      let jsonpCallback = null;
      let dataType = 'json';

      if (options.jsonp) {
        jsonpCallback = 'jsoncallback';
        dataType = 'jsonp'; // automatically adds callback param to url
      }

      const url = this.web.webServiceUrl('urn:com:loki:core:model:api:list', options);
      // eslint-disable-next-line no-undef
      let promise = $.ajax({
        type: 'GET',
        url,
        dataType,
        jsonp: jsonpCallback, // name of callback param
      });
      promise = this.handleJsonp(promise, options);
      return promise;
    }

    /**
     * Transforms results array/columns array into a mapped object
     * @function
     * @param {Object} data The returned data from a Loki API call
     * @param {string} options.format the format in which to return the data. "json" is the default.
     * @param {string} options.dataSpaceUrn the data space from which to load the data
     * @param {boolean} options.jsonp if true, use jsonp for cross site calls.
     * Also, options.format must be json. Default is false. (Not sure this works for HEAD.)
     * @return {Promise} resolving with header information
     */
    mapResultsFilter(data, hasOutputView) {
      let newResults;
      if (hasOutputView) {
        newResults = new Array(data.results.length);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < data.results.length; i++) {
          const result = data.results[i][0];
          newResults[i] = result;
        }
        return newResults;
      }
      newResults = [];
      const { columnNames } = data;
      if (columnNames) {
        data.results.forEach((result) => {
          newResults.push(this.hash(columnNames, result));
        });
      }

      data.results = newResults;
      return data;
    }

    /**
     * Executes a named query on the server or a query string
     * @function
     * @param {Object} options options and parameters for executing the query
     * @param {string} options.queryUrn the urn of the named query to be executed
     * @param {string} options.query the query to be executed
     * @param {string} options.format the format of the results. The default is "json"
     * @param {string} options.dataSpaceUrn the data space on which to run the query
     * @param {string[]|string[][]} options.params the numbered params for the query.
     * Each param may have multiple values.
     * These params are substituted into the query in the order given.
     * Examples: ["v1",["v2a","v2b],"v3"]
     * @param {Object|Object[]} options.namedParams the named params for the query.
     * Each param may have multiple values.
     * These params are  substituted into the query by name.
     * Examples: {p1:"v1",p2:["v2a","v2b"]}; [{name:"p1",value:"v1"},{name:"p2",value:["v2a","v2b"]}]
     * @param {Object|Object[]} options.expressionParams the expression params for the query.
     * These params can substitute expressions within the query and
     * are substituted into the query by name.
     * Examples: {p1:"v1",p2:["v2a","v2b"]}; [{name:"p1",value:"v1"},{name:"p2", value:["v2a","v2b"]}]
     * @param {number} options.begin (or options.beginIdx) used in query result paging,
     * the index of the first entity to be returned from  the query.
     * Ignored if a LokiYQuery is provided
     * @param {number} options.num (or options.numRequested) used in query result paging,
     * the number of entities to be returned from the query. Ignored if a LokiYQuery is provided
     * @param {string} options.outputView request that the first (and only) column returned
     * by the query (which must be a urn) is turned  into an object using the given outputView
     * @param {string} options.outputViews request that all columns returned by the query
     * (which must all be urns) are turned into objects  using the given outputViews
     * @param {boolean} options.mapResults if set to true then map the results such that
     * an array of objects is always returned.  Only  works for json data.
     * @param {boolean} options.post use POST http method
     * @param {boolean} options.jsonp if true, use jsonp for cross site calls.
     * Also, options.format must be json. Default is false. (Not sure this works for POST.)
     * @param {string} options.serviceGroupUrn use this service group to determine the base of
     * the url when connecting to another  application.
     * @param {string} options.connection use this connection to determine the base of
     * the url when connecting to another application.
     * @param {string} options.urlPrefix used to override the beginning of
     * the url so that another application may be called.
     * @param {boolean} options.useCurrentUserAuth if true, use the current user's
     * authentication to access the remote service. (default  false).
     * NOTE: does not work cross domain.
     * @return {Promise}
     */
    query(options) {
      options = options || {};

      let hasOutputView = false;
      if (options.outputView || options.outputViews) {
        hasOutputView = true;
      }
      if (typeof (options.post) !== 'undefined') ; else if (options.queryUrn) ; else ;

      let { queryUrn } = options;
      if (queryUrn && options.connection) {
        if (queryUrn.startsWith(':')) {
          // use connection root if there is no root to the queryUrn
          queryUrn = options.connection.rootUrn + queryUrn;
        }
      }

      let params;

      if (queryUrn) {
        params = `queryUrn=${this.web.urnToUrlParams(queryUrn)}`;
      } else if (options && !options.post) {
        params = `query=${encodeURIComponent(options.query)}`;
      }
      if (options.format) {
        params = `${params}&format=${options.format}`;
      } else {
        params += '&format=json'; // default to json
      }
      if (options.beginIdx) {
        params = `${params}&begin=${options.beginIdx}`;
      }
      if (options.begin) {
        params = `${params}&begin=${options.begin}`;
      }
      if (options.numRequested) {
        params = `${params}&num=${options.numRequested}`;
      } else if (options.num) {
        params = `${params}&num=${options.num}`;
      }
      if (options.dataSpaceUrn) {
        params = `${params}&dataSpaceUrn=${this.web.urnToUrlParams(options.dataSpaceUrn)}`;
      }
      if (options.outputView) {
        const outputView = this.web.urnToUrlParams(options.outputView);
        params = `${params}&outputView=${outputView}`;
      }

      let outputViewParam = '';
      if (options.outputView) {
        outputViewParam = `&outputView=${this.web.urnToUrlParams(options.outputView)}`;
      } else if (options.outputViews) {
        for (const i in options.outputViews) {
          outputViewParam = `${outputViewParam}&outputView=${this.web.urnToUrlParams(options.outputViews[i])}`;
        }
      }

      params += outputViewParam;

      let paramParam = '';
      // Numbered parameters are p1, p2, p3, etc and can be multi valued arrays
      if (options.params) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < options.params.length; i++) {
          if (options.params[i].isArray()) {
            // This parameter is an array, repeat its values in the p{x} url parameter
            // eslint-disable-next-line no-plusplus
            for (let j = 0; j < options.params[i].length; j++) {
              paramParam = `${paramParam}&p${i + 1}=${encodeURIComponent(options.params[i][j])}`;
            }
          } else {
            paramParam = `${paramParam}&p${i + 1}=${encodeURIComponent(options.params[i])}`;
          }
        }
      }
      // Named parameters are a name/value map and can have multi valued arrays
      if (options.namedParams) {
        paramParam += this.addParams(options.namedParams, 'p_');
      }
      // Expression parameters are a name/value map and can have multi valued arrays
      if (options.expressionParams) {
        paramParam += this.addParams(options.expressionParams, 'e_');
      }
      params += paramParam;

      const url = this.web.webServiceUrl('urn:com:loki:core:model:api:query', {
        subjectUrn: null,
        queryParams: params,
        serviceGroupUrn: options.serviceGroupUrn,
        connection: options.connection,
        urlPrefix: options.urlPrefix,
      });

      return axios({
        baseURL: this.baseUrl,
        method: 'GET',
        auth: this.auth || '',
        headers: {
          'Content-Type': 'application/json',
        },
        url,
      })
        .then((result) => (options.mapResults
          ? this.mapResultsFilter(result.data, hasOutputView) : result.data));
    }
  }

  /**
   * Web module
   * @module Loki/Environ
   */

  /**
   * @class Represents the Environ API
   */
  class Environ {
    /**
     * Constructs a configured instance of the Loki Environ API
     * @constructor
     * @param {Object} model Instance of the Model API
     */
    constructor(model) {
      // eslint-disable-next-line no-underscore-dangle
      this._connections = [];
      this.model = model;
    }

    addConnection(connection) {
      if (connection) {
        // eslint-disable-next-line no-underscore-dangle
        this._connections.push(connection);
      }
    }

    getConnection(serviceGroupUrn) {
      console.log('loki.environ.getConnection() is deprecated, please use loki.model.getConnectionByServiceGroup() instead.');
      return this.model.getConnectionByServiceGroup(serviceGroupUrn);
    }
  }

  /* eslint-disable class-methods-use-this */
  /* eslint-disable no-undef */
  /**
   * Model module
   * @module Loki/Model
   */

  /**
   * @class Represents the Model API
   */
  class Model {
    /**
     * Constructs a configured instance of the Loki Model API
     * @constructor
     * @param {Object} model Instance of the Environ API
     */
    constructor(environ) {
      this.environ = environ;
    }

    getConnectionByServiceGroup(serviceGroupUrn) {
      // eslint-disable-next-line no-underscore-dangle
      const connections = loki.environ._connections;
      for (let i = 0; i < connections.length; i += 1) {
        // eslint-disable-next-line no-underscore-dangle
        const aConn = connections[i];
        if (aConn.serviceGroupUrn === serviceGroupUrn) {
          return aConn;
        }
        if (aConn.serviceGroupUrns) {
          for (let j = 0; j < aConn.serviceGroupUrns.length; j += 1) {
            if (aConn.serviceGroupUrns[j] === serviceGroupUrn) {
              return aConn;
            }
          }
        }
      }
      return null;
    }

    getConnection(serviceGroupUrn) {
      console.log('loki.environ.getConnection() is deprecated, please use loki.model.getConnectionByServiceGroup() instead.');
      return loki.model.getConnectionByServiceGroup(serviceGroupUrn);
    }
  }

  /* eslint-disable class-methods-use-this */
  /**
   * Urn module
   * @module Loki/Urn
   */

  /**
   * @class Represents the Urn API
   */
  class Urn {
    /**
     * Returns Checks if the urn is a urn with a new marker '$' in it.
     * @function
     * @param {string} urn
     * @return {boolean} True if the urn is a urn with a new marker in it; false otherwise.
     */
    isNew(urn) {
      return (urn.indexOf('$') >= 0);
    }

    /**
     * Checks if the urn is a resource urn (with the resource marker '!' in it)
     * @function
     * @param {string} urn
     * @return {boolean} true if the urn is a resource urn; false otherwise.
     */
    isResourceUrn(urn) {
      return (urn.indexOf('!') >= 0);
    }

    /**
     * Checks if the urn contains a version component
     * @function
     * @param {string} urn
     * @return {boolean} true if the urn contains a version component; false otherwise
     */
    hasVersion(urn) {
      return (urn.indexOf('~') >= 0);
    }

    /**
     * Returns the version component of the urn if there is one
     * @function
     * @param {string} urn
     * @return {string} the version component of the urn
     */
    getVersion(urn) {
      const idx = urn.indexOf('~');
      if (idx >= 0 && idx !== urn.length() - 1) {
        return urn.substring(idx + 1);
      }
      return null;
    }

    /**
     * Returns the last segment of the given urn
     * @function
     * @param {string} urn
     * @returns {string} The last segment of the given urn
     */
    getLastSegment(urn) {
      if (!urn) {
        return null;
      }
      let index = -1;
      const index1 = urn.lastIndexOf(':');
      const index2 = urn.lastIndexOf('#');
      const index3 = urn.lastIndexOf('!');
      if (index1 > index2 && index1 > index3) {
        index = index1;
      } else if (index2 > index3) {
        index = index2;
      } else {
        index = index3;
      }
      let lastSegment;
      if (index < 0) {
        lastSegment = urn;
      } else {
        lastSegment = urn.substring(index + 1);
      }
      return lastSegment;
    }
  }

  /* eslint-disable no-restricted-syntax */
  /* eslint-disable no-param-reassign */
  /* eslint-disable class-methods-use-this */
  /**
   * Web module
   * @module Loki/Web
   */

  /**
   * @class Represents the Web API
   */
  class Web {
    /**
     * Constructs a configured instance of the Loki Web API
     * @constructor
     * @param {string} appName Name of the target app
     */
    constructor(appName) {
      this.appName = appName;
      this.apiPrefix = `/${this.appName}/api`;
      this.pagesPrefix = `/${this.appName}/pages`;
      this.homeUrl = `/${this.appName}/pages/app/home`;
      this.unauthorizedUrl = `/${this.appName}`;
      this.notFoundUrl = `/${this.appName}`;
    }

    urnToUrlPath(urn) {
      if (urn) {
        const exLoc = urn.lastIndexOf('!');
        const hashLoc = urn.lastIndexOf('#');
        const cLoc = urn.lastIndexOf(':');
        const pLoc = urn.lastIndexOf('.');

        urn = urn.replace(/#/g, '%23');
        urn = urn.replace(/:/g, '/');

        if (hashLoc !== -1) ; else if (exLoc === -1 && pLoc > cLoc) {
          // urn is an entity urn with a "." in the last segment
          // explicity add back a ":" to make sure loki doesn't think this is a resource.
          urn = `${urn.substring(0, cLoc)}:${urn.substring(cLoc + 1)}`;
        } else if (exLoc !== -1 && pLoc < exLoc) {
          // urn is an resource urn with no "." in the last segment
          // explicity add back a "!" to make sure loki doesn't think this is an entity.
          urn = `${urn.substring(0, cLoc)}:${urn.substring(cLoc + 1)}`;
        }

        return urn;
      }
      return null;
    }

    /**
     * @function
     * @param {string} urn
     * @return {unresolved}
     */
    urnToUrlParams(urn) {
      if (urn !== null) {
        return urn.replace(/#/g, '%23');
      }
      return null;
    }

    /**
     * Constructs a url for the resource.
     * This url will point to a web service that returns the resource's data (GET)
     * or allows the resource to be modified (POST,DELETE).
     * @function
     * @param {string} resourceUrn the urn of the resource
     * @param {object} options the options for construction the resource url
     * @param {type} options.queryParams a url query parameter string where parameters
     * are separated by '&amp;'. This string can optionally begin with a '?'.
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.urlPrefix use this prefix at the base of
     * the url in order to ling to a page in another application.
     * Typically you don't want to hardcode this so use options.serviceGroupUrn
     * or options.connection instead.
     * @param {boolean} options.download specifies whether the attachment
     * content-disposition header should be set so that the file is automatically
     * downloaded by the browser. If omitted download is defaulted to false.
     * @return {string} the url for the resource
     *
     */
    resourceUrl(resourceUrn, options) {
      if (!options) {
        options = {};
      }

      options.subjectUrn = resourceUrn;
      options.serviceUrn = 'urn:com:loki:core:model:api:resource';
      options.serviceTypePrefix = this.apiPrefix;

      if (options.download) {
        if (!options.queryParams) {
          options.queryParams = 'download=true';
        } else {
          options.queryParams = `${options.queryParams}&download=true`;
        }
      }

      return this.serviceUrl(options);
    }

    /**
     * Constructs a url for the resource and appends a release parameter that
     * allows for recaching when a major release is pushed.
     * This url will point to a web service that returns the resource's data (GET)
     * @function
     * @param resourceUrn the urn of the resource
     * @param {object} options the options for construction the resource url
     * @param {type} options.queryParams a url query parameter string where
     * parameters are separated by '&amp;'. This string can optionally begin with a '?'.
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.urlPrefix use this prefix at the base of
     * the url in order to ling to a page in another application.
     * Typically you don't want to hardcode this so use options.serviceGroupUrn
     * or options.connection instead.
     * @param {boolean} options.download specifies whether the attachment
     * content-disposition header should be set so that the file is automatically
     * downloaded by the browser. If omitted download is defaulted to false.
     * @return {string} the url for the resource
     */
    resourceUrlWithCacheCheck(resourceUrn, options) {
      if (!options) {
        options = {};
      }

      options.cacheCheck = true;
      const url = this.resourceUrl(resourceUrn, options);
      return url;
    }

    /**
     * @function
     * @param {string} imageUrn
     * @param {string} sizeUrn
     * @return {string} The resulting image url
     */
    imageUrl(imageUrn, sizeUrn) {
      const urnPath = this.urnToUrlPath(imageUrn);

      let url = `${this.apiPrefix}urn/com/loki/core/model/api/image/v/${urnPath}`;

      if (typeof (sizeUrn) !== 'undefined' && sizeUrn !== null) {
        url = `${url}?size=${this.urnToUrlParams(sizeUrn)}`;
      }
      return url;
    }

    /**
     * Constructs a url for the page with the given parameters
     * @function
     * @param {type} pageUrn the urn of the page
     * @param {object} options the options for construction the page url
     * @param {string} options.subjectUrn the urn of the data to be displayed on
     * the page or null if there is no subject data
     * @param {string} options.serviceUrn same as options.pageUrn
     * @param {string} options.queryParams a url query parameter string where parameters
     * are separated by '&amp;'. This string can optionally begin with a '?'.
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.urlPrefix use this prefix at the base of the url
     * in order to link to a page in another application.
     * Typically you don't want to hardcode this so use options.serviceGroupUrn
     * or options.connection instead.
     * @return {string} The resulting page url
     */
    pageUrl(pageUrn, options) {
      if (!options) {
        options = {};
      }

      options.serviceUrn = pageUrn;
      options.serviceTypePrefix = this.pagesPrefix;

      return this.serviceUrl(options);
    }

    /**
     * Constructs a url for the page with the given parameters and appends
     * a release parameter that allows for recaching when a major release is pushed.
     * @function
     * @param {type} pageUrn the urn of the page
     * @param {Object} options the options for construction the page url
     * @param {string} options.subjectUrn the urn of the data to be displayed on
     * the page or null if there is no subject data
     * @param {string} options.serviceUrn same as options.pageUrn
     * @param {string} options.queryParams a url query parameter string where
     * parameters are separated by '&amp;'. This string can optionally begin with a '?'.
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.urlPrefix use this prefix at the base of the url
     * in order to link to a page in another application. Typically you don't want
     * to hardcode this so use options.serviceGroupUrn or options.connection instead.
     * @return {string} The resulting page url
     */
    pageUrlWithCacheCheck(pageUrn, options) {
      if (!options) {
        options = {};
      }

      options.cacheCheck = true;

      return this.pageUrl(pageUrn, options);
    }

    /**
     * Constructs a url for a resource in the model dataspace
     * This url will point to a web service that returns the resource's data (GET)
     * or allows the resource to be modified (POST,DELETE).
     * BY DEFAULT CACHE CHECK IS ON which appends a release parameter that allows
     * for recaching when a major release is pushed.
     * @function
     * @param {string} resourceUrn the urn of the resource
     * @param {object} options the options for construction the resource url
     * @param {type} options.queryParams a url query parameter string where parameters
     * are separated by '&amp;'. This string can optionally begin with a '?'.
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.urlPrefix use this prefix at the base of the url
     * in order to ling to a page in another application. Typically you don't want
     * to hardcode this so use options.serviceGroupUrn or options.connection instead.
     * @param {boolean} options.download specifies whether the attachment content-disposition
     * header should be set so that the file is automatically downloaded by the browser.
     * If omitted download is defaulted to false.
     * @return {string} The resulting resource url
     */
    modelResUrl(resourceUrn, options) {
      if (!options) {
        options = {};
      }

      options.subjectUrn = resourceUrn;
      options.serviceUrn = 'urn:com:loki:core:model:api:modelResource';
      options.serviceTypePrefix = this.apiPrefix;

      if (options.download) {
        if (!options.queryParams) {
          options.queryParams = 'download=true';
        } else {
          options.queryParams = `${options.queryParams}&download=true`;
        }
      }

      options.cacheCheck = true;

      return this.serviceUrl(options);
    }

    /**
     * @todo add description
     * @function
     * @param {string} destUrn
     * @return {string} The resulting upload destination url
     */
    uploadUrl(destUrn) {
      const urnPath = this.urnToUrlPath(destUrn);
      const { apiPrefix } = this;
      return `${apiPrefix}urn/com/loki/core/model/api/upload/v/${urnPath}`;
    }

    /**
     * @todo add description
     * @function
     * @param {string} sourceUrn
     * @param {string} destUrn
     * @param {string} viewUrn
     * @param {Object} options of form {merge:"true",genUrnFromField:"no"}
     * @return {string} @todo add description
     */
    importUrl(sourceUrn, destUrn, viewUrn, options) {
      const destPath = this.urnToUrlPath(destUrn);
      let url = `${this.apiPrefix}urn/com/loki/importData/model/api/importData/v/${destPath}?source=${sourceUrn}`;
      if (typeof (viewUrn) !== 'undefined' && viewUrn !== null) {
        url = `${url}&importView=${viewUrn}`;
      }

      if (options) {
        // eslint-disable-next-line guard-for-in
        for (const option in options) {
          url = `${url}&${option}=${options[option]}`;
        }
      }

      return url;
    }

    /**
     * Returns a url for a loki data web service (CRUD service)
     * @function
     * @param {string} entityUrn the urn of the entity to create/read/update/delete
     * @param {string} viewUrn the view to user for a create/read/update
     * @param {Object} options the options for construction the data web service url
     * @param {string} options.queryParams any query parmeters to be added to the url
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when connecting to another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when connecting to another application.
     * @param {string} options.urlPrefix use this prefix at the base of the url
     * in order to connect to another application. Typically you don't want
     * to hardcode this so use options.serviceGroupUrn or options.connection instead.
     * @return {string} The resulting web service url
     */
    dataServiceUrl(entityUrn, viewUrn, options) {
      if (!options) {
        options = {};
      }

      options.subjectUrn = entityUrn;
      options.serviceUrn = viewUrn;
      options.serviceTypePrefix = this.apiPrefix;

      return this.serviceUrl(options);
    }

    /** Returns a url for a loki web service
     * @function
     * @param {string} serviceUrn the urn of the web service to call
     * @param {Object} options the options for construction the web service url
     * @param {string} options.subjectUrn the urn of the main entity/resource
     * on which to execute the service
     * @param {string} options.queryParams any query parmeters to be added to the url
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when connecting to another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when connecting to another application.
     * @param {string} options.urlPrefix use this prefix at the base of the url
     * in order to connect to another application. Typically you don't want
     * to hardcode this so use options.serviceGroupUrn or options.connection instead.
     * @return {string} The resulting web service url
     */
    webServiceUrl(serviceUrn, options) {
      if (!options) {
        options = {};
      }

      options.serviceUrn = serviceUrn;
      options.serviceTypePrefix = this.apiPrefix;

      return this.serviceUrl(options);
    }

    /**
     * Returns a url for a loki service (web service, page, or data service)
     * @function
     * @param {object} options the options for construction the  service url
     * @param {string} options.subjectUrn the urn of the main entity on which to execute the service
     * @param {string} options.serviceUrn the urn of the web service to call
     * @param {string} options.serviceTypePrefix for local services, this is the prefix
     * for the type of service. Typically /pages or /api
     * @param {string} options.queryParams any query parmeters to be added to the url
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when connecting to another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when connecting to another application.
     * @param {string} options.urlPrefix use this prefix at the base of the url
     * in order to connect to another application. Typically you don't want to
     * hardcode this so use options.serviceGroupUrn or options.connection instead.
     * @param {string} options.cacheCheck if true add a url param that forces the browser
     * to refresh the page in cache when a new release is deployed.
     * @return {string} The resulting service url
     */
    serviceUrl(options) {
      let newServiceUrn = options.serviceUrn;
      let newPrefix = '';
      let conn;
      if (options.urlPrefix) {
        newPrefix = options.urlPrefix;
      } else if (options.connection) {
        conn = options.connection;
        if (conn) {
          newPrefix = conn.url;
          if (newServiceUrn.slice(0, 1) === ':') {
            newServiceUrn = conn.rootUrn + newServiceUrn;
          }
        }
      } else if (options.serviceGroupUrn) {
        // TODO: fix environ
        // eslint-disable-next-line no-undef
        conn = environ.getConnection(options.serviceGroupUrn);
        if (conn) {
          newPrefix = conn.url;
          if (newServiceUrn.slice(0, 1) === ':') {
            newServiceUrn = conn.rootUrn + newServiceUrn;
          }
        }
      } else {
        newPrefix = options.serviceTypePrefix;
      }
      if (newPrefix.slice(-1) !== '/') {
        newPrefix = `${newPrefix}/`;
      }

      let serviceUrnPath = '';
      if (newServiceUrn) {
        serviceUrnPath = this.urnToUrlPath(newServiceUrn);
      }

      let subjectUrnPath = '';
      if (options.subjectUrn) {
        subjectUrnPath += this.urnToUrlPath(options.subjectUrn);
      }

      let { queryParams } = options;
      if (options.cacheCheck) {
        if (queryParams) {
          queryParams = `${queryParams}&release=${this.getReleaseNumber()}`;
        } else {
          queryParams = `?release=${this.getReleaseNumber()}`;
        }
      }

      let url = `${newPrefix + serviceUrnPath}/v/${subjectUrnPath}`;
      url = this.appendParamsToUrl(url, queryParams);
      return url;
    }

    appendParamsToUrl(url, queryParams) {
      if (queryParams) {
        if (queryParams.charAt(0) === '&') {
          queryParams = queryParams.substring(1);
        }

        if (queryParams.charAt(0) !== '?') {
          url = `${url}?`;
        }

        url += queryParams;
      }
      return url;
    }
  }

  /**
   * Loki module
   * @module Loki
   */

  /**
   * @class Represents the Loki client API
   */
  class Loki {
    /**
     * Constructs a Loki client instance using user-provided configuration
     * @constructor
     * @param {Object} config Config object used to instantiate Loki
     * @param {string} config.baseUrl Base url for the target cloud environment
     * @param {string} config.appName Name of the target app
     * @param {Object} config.auth Object containing credentials for API calls to Loki
     * @param {string} config.auth.username String containing the username for all Loki API calls
     * @param {string} config.auth.password String containing the password for all Loki API calls
     */
    constructor(config) {
      const model = new Model();
      this.baseUrl = config.baseUrl;
      this.appName = config.appName;
      this.environ = new Environ(model);
      this.model = new Model(this.environ);
      this.web = new Web(this.appName);
      this.urn = new Urn();
      this.data = new Data(config, this.web, this.urn);
    }
  }

  return Loki;

})));
//# sourceMappingURL=umd-bundle.js.map
