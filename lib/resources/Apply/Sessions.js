'use strict';

const Resource = require('../Resource');

class Sessions extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/apply/sessions';
  }
}

module.exports = Sessions;
