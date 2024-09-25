'use strict';

const Resource = require('./Resource');

class Quotes extends Resource {
  constructor(apiKey, baseURL, options) {
    super(apiKey, baseURL, options);
    this.path = '/quotes';
  }
}

module.exports = Quotes;
