/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const data = {
  loadEntity(urn, viewUrn, options) {
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

    const url = loki.web.dataServiceUrl(urn, viewUrn, options);
    let promise = $.ajax({
      type: 'GET',
      contentType: 'application/json',
      url,
      dataType,
      jsonp: jsonpCallback, // name of callback param
    });

    promise = loki.data._handleJsonp(promise, options);
    return promise;
  },
  _handleJsonpErrHandler(xhr, statusCode, statusText) {
    try {
      const json = xhr.responseText.replace(/jQuery[0-9_]+\(/g, '').replace(/\)/g, '').replace('{"results":[', '');
      xhr.responseJSON = JSON.parse(json);
    } catch (error) {
      console.error(error);
    }
    return xhr;
  },
  saveEntity() {
    console.log('saveEntity');
  },
};

// eslint-disable-next-line import/prefer-default-export
export { data };
