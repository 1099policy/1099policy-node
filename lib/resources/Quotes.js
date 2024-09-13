'use strict';

const Resource = require('./Resource');

class Quotes extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/quotes';
  }
}

module.exports = Quotes;
