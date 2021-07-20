/**
 * Loki module
 * @module Loki
 */

import Data from './data/index';
import Environ from './environ/index';
import Model from './model/index';
import Urn from './urn/index';
import Web from './web/index';

/**
 * @class Represents the Loki client API
 */
export default class Loki {
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
