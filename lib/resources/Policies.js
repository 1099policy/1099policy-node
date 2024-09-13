'use strict';

const Resource = require('./Resource');

class Policies extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/policies';
  }
}

module.exports = Policies;
