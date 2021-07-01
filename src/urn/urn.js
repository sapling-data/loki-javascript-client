/* eslint-disable class-methods-use-this */
/**
 * Urn module
 * @module Loki/Urn
 */

/**
 * @class Represents the Urn API
 */
export default class Urn {
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
