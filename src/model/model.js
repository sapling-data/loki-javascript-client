/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/**
 * Model module
 * @module Loki/Model
 */

/**
 * @class Represents the Model API
 */
export default class Model {
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
