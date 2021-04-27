/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { environ } from './environ';

const web = {
  urlPrefixes: {
    api: '/sd-cloud/api',
    pages: '/sd-cloud/pages',
  },
  /**
   *
   * @return {String}
   */
  getApiServicePrefix: () => this.urlPrefixes.api,
  /**
   *
   * @return {String}
   */
  getPagesPrefix: () => this.urlPrefixes.pages,
  /**
   *
   * @param {type} urn
   * @return {unresolved}
   */
  urnToUrlPath: (urn) => {
    if (urn) {
      const exLoc = urn.lastIndexOf('!');
      const hashLoc = urn.lastIndexOf('#');
      const cLoc = urn.lastIndexOf(':');
      const pLoc = urn.lastIndexOf('.');

      urn = urn.replace(/#/g, '%23');
      urn = urn.replace(/:/g, '/');

      if (hashLoc !== -1) {
        // contained entities are unambiguous so no work is needed here
      } else if (exLoc === -1 && pLoc > cLoc) {
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
  },
  /**
   *
   * @param {type} urn
   * @return {unresolved}
   */
  urnToUrlParams(urn) {
    if (urn !== null) {
      return urn.replace(/#/g, '%23');
    }
    return null;
  },
  /** Constructs a url for the resource.
     * This url will point to a web service that returns the resource's data (GET)
     * or allows the resource to be modified (POST,DELETE).
     *
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
  resourceUrl(resourceUrn, options, notUsed3) {
    if (options === null || typeof options === 'string') {
      console.log('loki.web.resourceUrl(resourceUrn, queryParams, download) is deprecated, please use loki.web.resourceUrl(resourceUrn,options)');
      options = {
        queryParams: options,
        download: notUsed3,
      };
    }

    if (!options) {
      options = {};
    }

    options.subjectUrn = resourceUrn;
    options.serviceUrn = 'urn:com:loki:core:model:api:resource';
    options.serviceTypePrefix = this.getApiServicePrefix();

    if (options.download) {
      if (!options.queryParams) {
        options.queryParams = 'download=true';
      } else {
        options.queryParams = `${options.queryParams}&download=true`;
      }
    }

    return this.serviceUrl(options);
  },
  /** Constructs a url for the resource and appends a release parameter that
   * allows for recaching when a major release is pushed.
     * This url will point to a web service that returns the resource's data (GET)
     *
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
  resourceUrlWithCacheCheck(resourceUrn, options, notUsed3) {
    if (options === null || typeof options === 'string') {
      console.log('loki.web.resourceUrlWithCacheCheck(resourceUrn, queryParams, download) is deprecated, please use loki.web.resourceUrlWithCacheCheck(resourceUrn,options)');
      options = {
        queryParams: options,
        download: notUsed3,
      };
    }
    if (!options) {
      options = {};
    }
    options.cacheCheck = true;
    const url = this.resourceUrl(resourceUrn, options);
    return url;
  },
  /**
     *
     * @deprecated for backward compatibility, use resourceUrlWithCacheCheck() instead
     */
  resourceUrlwithCacheCheck(resourceUrn, queryParams, download) {
    console.log('loki.web.resourceUrlwithCacheCheck() is deprecated, please use loki.web.resourceUrlWithCacheCheck() instead');
    return this.resourceUrlWithCacheCheck(resourceUrn, queryParams, download);
  },
  /**
     *
     * @param {String} imageUrn
     * @param {String} sizeUrn
     * @return {String}
     */
  imageUrl(imageUrn, sizeUrn) {
    const urnPath = this.urnToUrlPath(imageUrn);
    const apiPrefix = this.getApiServicePrefix();

    let url = `${apiPrefix}urn/com/loki/core/model/api/image/v/${urnPath}`;

    if (typeof (sizeUrn) !== 'undefined' && sizeUrn !== null) {
      url = `${url}?size=${this.urnToUrlParams(sizeUrn)}`;
    }
    return url;
  },
  /** Constructs a url for the page with the given parameters
     *
     * @param {type} pageUrn the urn of the page
     * @param {object} options the options for construction the page url
     * @param {string} options.subjectUrn the urn of the data to be displayed on
     * the page or null if there is no subject data
     * @param {type} options.serviceUrn same as options.pageUrn
     * @param {type} options.queryParams a url query parameter string where parameters
     * are separated by '&amp;'. This string can optionally begin with a '?'.
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.urlPrefix use this prefix at the base of the url
     * in order to link to a page in another application.
     * Typically you don't want to hardcode this so use options.serviceGroupUrn
     * or options.connection instead.
     * @return {String} the url for the page
     */
  pageUrl(pageUrn, options, notUsed3, notUsed4) {
    if (options === null || typeof options === 'string') {
      console.log('loki.web.pageUrl(subjectUrn,pageUrn,queryParams,urlPrefix) is deprecated, please use loki.web.pageUrl(pageUrn,options)');
      const param1 = pageUrn;
      const param2 = options;

      pageUrn = param2;
      options = {
        subjectUrn: param1,
        queryParams: notUsed3,
        urlPrefix: notUsed4,
      };
    }

    if (!options) {
      options = {};
    }

    options.serviceUrn = pageUrn;
    options.serviceTypePrefix = this.getPagesPrefix();

    return this.serviceUrl(options);
  },
  /**  Constructs a url for the page with the given parameters and appends
   * a release parameter that allows for recaching when a major release is pushed.
     *
     * @param {type} pageUrn the urn of the page
     * @param {object} options the options for construction the page url
     * @param {string} options.subjectUrn the urn of the data to be displayed on
     * the page or null if there is no subject data
     * @param {type} options.serviceUrn same as options.pageUrn
     * @param {type} options.queryParams a url query parameter string where
     * parameters are separated by '&amp;'. This string can optionally begin with a '?'.
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when linking to a page in another application.
     * @param {string} options.urlPrefix use this prefix at the base of the url
     * in order to link to a page in another application. Typically you don't want
     * to hardcode this so use options.serviceGroupUrn or options.connection instead.
     * @return {String} the url for the page
     */
  pageUrlWithCacheCheck(pageUrn, options, notUsed3, notUsed4) {
    if (options === null || typeof options === 'string') {
      console.log('loki.web.pageUrlWithCacheCheck(subjectUrn,pageUrn,queryParams,urlPrefix) is deprecated, please use loki.web.pageUrlWithCacheCheck(pageUrn,options)');
      const param1 = pageUrn;
      const param2 = options;
      pageUrn = param2;
      options = {
        subjectUrn: param1,
        queryParams: notUsed3,
        urlPrefix: notUsed4,
      };
    }

    if (!options) {
      options = {};
    }

    options.cacheCheck = true;

    return this.pageUrl(pageUrn, options);
  },
  /**
     *
     * @deprecated for backward compatibility, use pageUrlWithCacheCheck() instead
     */
  pageUrlwithCacheCheck(subjectUrn, pageUrn, queryParams, prefix) {
    console.log('loki.pageUrlwithCacheCheck() is deprecated, please use loki.pageUrlWithCacheCheck() instead');
    return this.pageUrlWithCacheCheck(subjectUrn, pageUrn, queryParams, prefix);
  },
  /** Constructs a url for a resource in the model dataspace
     * This url will point to a web service that returns the resource's data (GET)
     * or allows the resource to be modified (POST,DELETE).
     * BY DEFAULT CACHE CHECK IS ON which appends a release parameter that allows
     * for recaching when a major release is pushed.
     *
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
     * @return {string} the url for the resource
     *
     */
  modelResUrl(resourceUrn, options) {
    if (!options) {
      options = {};
    }

    options.subjectUrn = resourceUrn;
    options.serviceUrn = 'urn:com:loki:core:model:api:modelResource';
    options.serviceTypePrefix = this.getApiServicePrefix();

    if (options.download) {
      if (!options.queryParams) {
        options.queryParams = 'download=true';
      } else {
        options.queryParams = `${options.queryParams}&download=true`;
      }
    }

    options.cacheCheck = true;

    return this.serviceUrl(options);
  },
  /**
     *
     * @param {type} destUrn
     * @return {String}
     */
  uploadUrl(destUrn) {
    const urnPath = this.urnToUrlPath(destUrn);
    const apiPrefix = this.getApiServicePrefix();
    return `${apiPrefix}urn/com/loki/core/model/api/upload/v/${urnPath}`;
  },
  /**
     *
     * @param {type} sourceUrn
     * @param {type} destUrn
     * @param {type} viewUrn
     * @param {type} options of form {merge:"true",genUrnFromField:"no"}
     * @return {String}
     */
  importUrl(sourceUrn, destUrn, viewUrn, options) {
    const destPath = this.urnToUrlPath(destUrn);
    const apiPrefix = this.getApiServicePrefix();
    let url = `${apiPrefix}urn/com/loki/importData/model/api/importData/v/${destPath}?source=${sourceUrn}`;
    if (typeof (viewUrn) !== 'undefined' && viewUrn !== null) {
      url = `${url}&importView=${viewUrn}`;
    }

    if (options) {
      for (const option in options) {
        url = `${url}&${option}=${options[option]}`;
      }
    }

    return url;
  },
  /** Returns a url for a loki data web service (CRUD service)
     * @param {string} entityUrn the urn of the entity to create/read/update/delete
     * @param {string} viewUrn the view to user for a create/read/update
     * @param {object} options the options for construction the data web service url
     * @param {string} options.queryParams any query parmeters to be added to the url
     * @param {string} options.serviceGroupUrn use this service group to determine
     * the base of the url when connecting to another application.
     * @param {string} options.connection use this connection to determine
     * the base of the url when connecting to another application.
     * @param {string} options.urlPrefix use this prefix at the base of the url
     * in order to connect to another application. Typically you don't want
     * to hardcode this so use options.serviceGroupUrn or options.connection instead.
     * @return {string} the url for the web service
     */
  dataServiceUrl(entityUrn, viewUrn, options) {
    if (!options) {
      options = {};
    }
    options.subjectUrn = entityUrn;
    options.serviceUrn = viewUrn;
    options.serviceTypePrefix = this.getApiServicePrefix();

    return this.serviceUrl(options);
  },
  /** Returns a url for a loki web service
     * @param {string} serviceUrn the urn of the web service to call
     * @param {object} options the options for construction the web service url
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
     * @return {string} the url for the web service
     */
  webServiceUrl(serviceUrn, options, notUsed3, notUsed4) {
    if (options === null || typeof options === 'string') {
      console.log('loki.web.webServiceUrl(subjectUrn,serviceUrn,queryParams,urlPrefix) is deprecated, please use loki.web.webServiceUrl(serviceUrn,options)');
      const param1 = serviceUrn;
      const param2 = options;
      serviceUrn = param2;
      options = {
        subjectUrn: param1,
        queryParams: notUsed3,
        urlPrefix: notUsed4,
      };
    }

    if (!options) {
      options = {};
    }

    options.serviceUrn = serviceUrn;
    options.serviceTypePrefix = this.getApiServicePrefix();

    return this.serviceUrl(options);
  },
  /** Returns a url for a loki service (web service, page, or data service)
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
     * @return {string} the url for the service
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
  },
  homeUrl: '/sd-cloud/pages/app/home',
  unauthorizedUrl: '/sd-cloud',
  notFoundUrl: '/sd-cloud',
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
  },
};
// eslint-disable-next-line import/prefer-default-export
export { web };
