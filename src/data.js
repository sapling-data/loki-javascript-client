/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { web } from './web';
import { urn } from './urn';

const dataApi = {
  loadEntity(entityUrn, viewUrn, options) {
    options = options || {};
    // set query params based on other options, but don't allow caller to set options.queryParams
    if (options.format) {
      options.queryParams = `format=${options.format}`;
    } else {
      // default to json
      options.queryParams = 'format=json';
      options.format = 'json';
    }

    if (options.dataSpaceUrn) {
      options.queryParams = `${options.queryParams}&dataSpaceUrn=${options.dataSpaceUrn}`;
    }

    let jsonpCallback = null;
    let dataType = options.format;

    if (options.jsonp) {
      jsonpCallback = 'jsoncallback';
      dataType = 'jsonp'; // automatically adds callback param to url
    }

    if (options.format === 'xml') {
      // jquery will return a dom object for xml, but we typically want a string
      dataType = 'text';
    }

    const url = web.dataServiceUrl(entityUrn, viewUrn, options);
    let promise = $.ajax({
      type: 'GET',
      contentType: 'application/json',
      url,
      dataType,
      jsonp: jsonpCallback, // name of callback param
    });

    promise = this.handleJsonp(promise, options);
    return promise;
  },
  loadResource(resourceUrn, options) {
    options = options || {};

    if (options.dataSpaceUrn) {
      options.queryParams = `dataSpaceUrn=${options.dataSpaceUrn}&`;
    } else {
      options.queryParams = '';
    }
    options.queryParams = `${options.queryParams}noCache=${(new Date()).getTime()}`; // prevent caching
    const url = web.resourceUrl(urn, options);
    const promise = $.ajax({
      type: 'GET',
      dataType: 'text',
      url,
    });
    return promise;
  },
  saveEntity(entityUrn, viewUrn, entityData, options) {
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

    let jsonpCallback = null;
    let dataType = 'json';
    if (options.jsonp) {
      jsonpCallback = 'jsoncallback';
      dataType = 'jsonp'; // automatically adds callback param to url
    }

    const url = web.dataServiceUrl(entityUrn, viewUrn, options);
    let promise = $.ajax({
      method: 'POST',
      contentType: 'application/json',
      url,
      data: typeof data === 'string' ? entityData : JSON.stringify(entityData),
      dataType,
      jsonp: jsonpCallback, // name of callback param
    });
    promise = this.handleJsonp(promise, options);
    return promise;
  },
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
  deleteEntity(entityUrn, options, unused1) {
    if (arguments.length > 2 || typeof options === 'string') {
      // for backward compatibility, arguments used to be (urn,view,options) but view is not needed
      console.log('loki.data.deleteEntity(urn,view,options) is deprecated, please use loki.data.deleteEntity(urn, options)');
      options = unused1 || {};
    } else {
      options = options || {};
    }
    return this.deleteItem(entityUrn, options);
  },
  deleteItem(itemUrn, options) {
    options = options || {};
    // set query params based on other options, but don't allow caller to set options.queryParams
    if (options.format) {
      options.queryParams = `format=${options.format}`;
    } else {
      options.queryParams = 'format=json'; // default to json
    }
    if (options.recursive && options.recursive === true) {
      options.queryParams += '&recursive=true';
    }
    if (options.dataSpaceUrn) {
      options.queryParams = `${options.queryParams}&dataSpaceUrn=${options.dataSpaceUrn}`;
    }

    let jsonpCallback = null;
    let dataType = 'json';
    if (options.jsonp) {
      jsonpCallback = 'jsoncallback';
      dataType = 'jsonp'; // automatically adds callback param to url
    }

    let url;
    if (urn.isResourceUrn(itemUrn)) {
      url = web.resourceUrl(itemUrn, options);
    } else {
      url = web.dataServiceUrl(itemUrn, 'urn:com:loki:core:model:api:rawData', options);
    }

    let promise = $.ajax({
      method: 'DELETE',
      url,
      dataType,
      jsonp: jsonpCallback, // name of callback param
    });
    promise = this.handleJsonp(promise, options);
    return promise;
  },
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
  },
  handleJsonp(promise, options) {
    // NOTE: auth on cross domain jsonp won't work since cross-domain jsonp cannot send headers
    // since it injects a script tag into the html
    if (options.jsonp) {
    // translate error message from jsonp to json if needed
      // promise = promise.then(function(data, statusCode, xhr) {
      //     return data;
      // }, loki.data._handleJsonpErrHandler);
    }
    return promise;
  },
  handleJsonpErrHandler(xhr, statusCode, statusText) {
    try {
      const json = xhr.responseText.replace(/jQuery[0-9_]+\(/g, '').replace(/\)/g, '').replace('{"results":[', '');
      xhr.responseJSON = JSON.parse(json);
    } catch (error) {
      console.error(error);
    }
    return xhr;
  },
  addParamValue(name, value, paramParam, prefix) {
    if ($.isArray(value)) {
      // This value is an array, repeat all values in the url parameter
      for (let j = 0; j < value.length; j++) {
        paramParam = `${paramParam}&${prefix}${name}=${encodeURIComponent(value[j])}`;
      }
    } else {
      paramParam = `${paramParam}&${prefix}${name}=${encodeURIComponent(value)}`;
    }
    return paramParam;
  },
  addParams(params, prefix) {
    let paramParam = '';
    if ($.isArray(params)) {
      for (let i = 0; i < params.length; i++) {
        paramParam = this.addParamValue(params[i].name, params[i].value, paramParam, prefix);
      }
    } else {
      for (const name in params) {
        paramParam = this.addParamValue(name, params[name], paramParam, prefix);
      }
    }
    return paramParam;
  },
  hash(keys, values) {
    const hash = {};
    const vlen = (values && values.length) || 0;
    let i; let
      len;
    for (i = 0, len = keys.length; i < len; ++i) {
      if (i in keys) {
        hash[keys[i]] = vlen > i && i in values ? values[i] : true;
      }
    }
    return hash;
  },
  /** Gets header info for the entity or resource without retrieving the data
  * @memberof module:lokiJQuery
  * @param {string} entityUrn the urn of the entity or resource
  * @param {string} options.format the format in which to return the data. "json" is the default.
  * @param {string} options.dataSpaceUrn the data space from which to load the data
  * @param {boolean} options.jsonp if true, use jsonp for cross site calls.
  * Also, options.format must be json. Default is false. (Not sure this works for HEAD.)
  * @return {Promise} resolving with header information
*/
  head(entityUrn, options) {
    options = options || {};
    if (options.format) {
      options.queryParams = `format=${options.format}`;
    } else {
      options.queryParams = 'format=json'; // default to json
    }
    if (options.dataSpaceUrn) {
      options.queryParams = `${options.queryParams}&dataSpaceUrn=${options.dataSpaceUrn}`;
    }
    let url;
    if (urn.isResourceUrn(entityUrn)) {
      url = web.resourceUrl(entityUrn, options);
    } else {
      url = web.dataServiceUrl(entityUrn, 'urn:com:loki:core:model:api:rawData', options);
    }

    let jsonpCallback = null;
    let dataType = 'json';
    if (options.jsonp) {
      jsonpCallback = 'jsoncallback';
      dataType = 'jsonp'; // automatically adds callback param to url
    }

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
  },
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
      const outputView = web.urnToUrlParams(options.outputView);
      options.queryParams = `${options.queryParams}&outputView=${outputView}`;
    }

    options.subjectUrn = parentUrn;

    let jsonpCallback = null;
    let dataType = 'json';

    if (options.jsonp) {
      jsonpCallback = 'jsoncallback';
      dataType = 'jsonp'; // automatically adds callback param to url
    }

    const url = web.webServiceUrl('urn:com:loki:core:model:api:list', options);
    let promise = $.ajax({
      type: 'GET',
      url,
      dataType,
      jsonp: jsonpCallback, // name of callback param
    });
    promise = this.handleJsonp(promise, options);
    return promise;
  },
  mapResultsFilter(results, hasOutputview) {
    let newResults;
    if (hasOutputview) {
      newResults = new Array(results.results.length);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < results.results.length; i++) {
        const result = results.results[i][0];
        newResults[i] = result;
      }
      return newResults;
    }
    newResults = [];
    const { columnNames } = results;
    if (columnNames) {
      $.each(results.results, (i, result) => {
        newResults.push(this.hash(columnNames, result));
      });
    }

    results.results = newResults;
    return results;
  },
  mapResultsFilter(results, hasOutputview) {
    let newResults;
    if (hasOutputview) {
      newResults = new Array(results.results.length);
      for (let i = 0; i < results.results.length; i++) {
        const result = results.results[i][0];
        newResults[i] = result;
      }
      return newResults;
    }
    newResults = [];
    const { columnNames } = results;
    if (columnNames) {
      $.each(results.results, (i, result) => {
        newResults.push(this.hash(columnNames, result));
      });
    }

    results.results = newResults;
    return results;
  },
  /** Execute a named query on the server or a query string
  * @memberof module:lokiJQuery
  * @param {Object} options options and parameters for executing the query
  * @param {string} options.queryUrn the urn of the named query to be executed
  * @param {string} options.query the query to be executed
  * @param {string} options.format the format of the results. The default is "json"
  * @param {string} options.dataSpaceUrn the data space on which to run the query
  * @param {string[]|string[][]} options.params the numbered params for the query. Each param may have multiple values.  These params are substituted into the query in the order given. Examples: ["v1",["v2a","v2b],"v3"]
  * @param {Object|Object[]} options.namedParams the named params for the query. Each param may have multiple values.  These params are substituted into the query by name. Examples: {p1:"v1",p2:["v2a","v2b"]}; [{name:"p1",value:"v1"},{name:"p2",value:["v2a","v2b"]}]
  * @param {Object|Object[]} options.expressionParams the expression params for the query.  These params can substitute expressions within the query and are substituted into the query by name. Examples: {p1:"v1",p2:["v2a","v2b"]}; [{name:"p1",value:"v1"},{name:"p2",value:["v2a","v2b"]}]
  * @param {number} options.begin (or options.beginIdx) used in query result paging, the index of the first entity to be returned from the query. Ignored if a LokiYQuery is provided
  * @param {number} options.num (or options.numRequested) used in query result paging, the number of entities to be returned from the query. Ignored if a LokiYQuery is provided
  * @param {string} options.outputView request that the first (and only) column returned by the query (which must be a urn) is turned into an object using the given outputView
  * @param {string} options.outputViews request that all columns returned by the query (which must all be urns) are turned into objects using the given outputViews
  * @param {boolean} options.mapResults if set to true then map the results such that an array of objects is always returned.  Only works for json data.
  * @param {boolean} options.post use POST http method
  * @param {boolean} options.jsonp if true, use jsonp for cross site calls. Also, options.format must be json. Default is false. (Not sure this works for POST.)
  * @param {string} options.serviceGroupUrn use this service group to determine the base of the url when connecting to another application.
  * @param {string} options.connection use this connection to determine the base of the url when connecting to another application.
  * @param {string} options.urlPrefix used to override the beginning of the url so that another application may be called.
  * @param {boolean} options.useCurrentUserAuth if true, use the current user's authentication to access the remote service. (default false). NOTE: does not work cross domain.
  * @return {Promise}
  */
  query(options, unused) {
    if (typeof options === 'string') {
      // handle loki.data.query(queryUrn,options) in a backward compatible way
      console.log("loki.data.query(queryUrn,options) is deprecated, please use loki.data.query(options) where one option is 'queryUrn'.");
      unused.queryUrn = options;
      options = unused;
    }
    options = options || {};
    if (options.engine && !options.dataSpaceUrn) {
      options.dataSpaceUrn = options.engine;
      console.log('The options.query param is deprecated fro loki.data.query(). Use options.dataSpaceUrn instead.');
    }

    let hasOutputView = false;
    if (options.outputView || options.outputViews) {
      hasOutputView = true;
    }

    let post;
    if (typeof (options.post) !== 'undefined') {
      post = options.post;
    } else if (options.queryUrn) {
      post = false;
      // default to GET when there is a queryUrn so that we have a easy to repeat url for the query
    } else {
      post = true;
      // default to POST for an adhoc query
    }

    let jsonpCallback = null;
    let dataType = 'json';
    if (options.jsonp) {
      jsonpCallback = 'jsoncallback';
      dataType = 'jsonp'; // automatically adds callback param to url
    }

    let { queryUrn } = options;
    if (queryUrn && options.connection) {
      if (queryUrn.startsWith(':')) {
        // use connection root if there is no root to the queryUrn
        queryUrn = options.connection.rootUrn + queryUrn;
      }
    }

    let headers;
    if (options.useCurrentUserAuth && user.getUserSessionKey) {
      headers = { Authorization: `LOKISESSION ${user.getUserSessionKey()}` };
    }

    let url;
    let promise;
    if (post) { // POST
      url = web.webServiceUrl('urn:com:loki:core:model:api:query', {
        subjectUrn: null,
        queryParams: '',
        serviceGroupUrn: options.serviceGroupUrn,
        connection: options.connection,
        urlPrefix: options.urlPrefix,
      });
      const postOpts = JSON.parse(JSON.stringify(options)); // make a copy
      postOpts.queryUrn = queryUrn;
      delete postOpts.mapResults;
      delete postOpts.post;
      if (typeof postOpts.begin !== 'undefined') {
        postOpts.beginIdx = postOpts.begin; // the post json param is beginIdx for the web service
        delete postOpts.begin;
      }
      if (typeof postOpts.num !== 'undefined') {
        postOpts.numRequested = postOpts.num;
        // the post json param is numRequested for the web service
        delete postOpts.num;
      }
      promise = $.ajax({
        type: 'POST',
        url,
        contentType: 'application/json',
        data: JSON.stringify(postOpts),
        dataType,
        jsonp: jsonpCallback, // name of callback param
        // beforeSend: function(xhr){loki.data._setHeaders(xhr,headers);},
        headers, // requires jquery 1.5
      });
    } else { // GET
      let params;
      if (queryUrn) {
        params = `queryUrn=${web.urnToUrlParams(queryUrn)}`;
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
        params = `${params}&dataSpaceUrn=${web.urnToUrlParams(options.dataSpaceUrn)}`;
      }
      if (options.outputView) {
        const outputView = web.urnToUrlParams(options.outputView);
        params = `${params}&outputView=${outputView}`;
      }

      let outputViewParam = '';
      if (options.outputView) {
        outputViewParam = `&outputView=${web.urnToUrlParams(options.outputView)}`;
      } else if (options.outputViews) {
        for (var i in options.outputViews) {
          outputViewParam = `${outputViewParam}&outputView=${web.urnToUrlParams(options.outputViews[i])}`;
        }
      }
      params += outputViewParam;

      let paramParam = '';
      // Numbered parameters are p1, p2, p3, etc and can be multi valued arrays
      if (options.params) {
        for (var i = 0; i < options.params.length; i++) {
          if ($.isArray(options.params[i])) {
            // This parameter is an array, repeat its values in the p{x} url parameter
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

      url = web.webServiceUrl('urn:com:loki:core:model:api:query', {
        subjectUrn: null,
        queryParams: params,
        serviceGroupUrn: options.serviceGroupUrn,
        connection: options.connection,
        urlPrefix: options.urlPrefix,
      });

      promise = $.ajax({
        type: 'GET',
        url,
        dataType,
        jsonp: jsonpCallback, // name of callback param
        // beforeSend: function(xhr){loki.data._setHeaders(xhr,headers);},
        headers, // requires jquery 1.5
      });
    }
    promise = this.handleJsonp(promise, options);

    if (options.mapResults) {
      promise = promise.then((data) => this.mapResultsFilter(data, hasOutputView));
    }
    return promise;
  },
};

// eslint-disable-next-line import/prefer-default-export
export { dataApi };
