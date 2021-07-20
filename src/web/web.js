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
export default class Web {
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
