'use strict';

const Resource = require('./Resource');

class Jobs extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/jobs';
  }
}

module.exports = Jobs;
