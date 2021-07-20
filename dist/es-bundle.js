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

var utils$d = {
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

var utils$c = utils$d;

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
var buildURL$2 = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$c.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils$c.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils$c.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils$c.forEach(val, function parseValue(v) {
        if (utils$c.isDate(v)) {
          v = v.toISOString();
        } else if (utils$c.isObject(v)) {
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

var utils$b = utils$d;

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
  utils$b.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager$1;

var utils$a = utils$d;

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
  utils$a.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel$1 = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var utils$9 = utils$d;

var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$9.forEach(headers, function processHeader(value, name) {
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
var enhanceError$1 = function enhanceError(error, config, code, request, response) {
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

var enhanceError = enhanceError$1;

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
var createError$2 = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

var createError$1 = createError$2;

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle$1 = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError$1(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

var utils$8 = utils$d;

var cookies$1 = (
  utils$8.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils$8.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils$8.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils$8.isString(domain)) {
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
var buildFullPath$1 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

var utils$7 = utils$d;

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

  utils$7.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils$7.trim(line.substr(0, i)).toLowerCase();
    val = utils$7.trim(line.substr(i + 1));

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

var utils$6 = utils$d;

var isURLSameOrigin$1 = (
  utils$6.isStandardBrowserEnv() ?

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
        var parsed = (utils$6.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
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

var utils$5 = utils$d;
var settle = settle$1;
var cookies = cookies$1;
var buildURL$1 = buildURL$2;
var buildFullPath = buildFullPath$1;
var parseHeaders = parseHeaders$1;
var isURLSameOrigin = isURLSameOrigin$1;
var createError = createError$2;

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils$5.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);

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

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils$5.isStandardBrowserEnv()) {
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
      utils$5.forEach(requestHeaders, function setRequestHeader(val, key) {
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
    if (!utils$5.isUndefined(config.withCredentials)) {
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

var utils$4 = utils$d;
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
    adapter = xhr;
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

var utils$3 = utils$d;
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

var utils$2 = utils$d;

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

var utils$1 = utils$d;
var buildURL = buildURL$2;
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

var utils = utils$d;
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

export default Loki;
//# sourceMappingURL=es-bundle.js.map
