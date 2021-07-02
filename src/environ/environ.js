/**
 * Web module
 * @module Loki/Environ
 */

/**
 * @class Represents the Environ API
 */
export default class Environ {
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
