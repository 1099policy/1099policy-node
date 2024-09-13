'use strict';

const Resource = require('./Resource');

class Contractors extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/contractors';
  }
}

module.exports = Contractors;
