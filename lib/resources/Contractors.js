'use strict';

const Resource = require('./Resource');

class Contractors extends Resource {
  constructor(apiKey, baseURL, options) {
    super(apiKey, baseURL, options);
    this.path = '/contractors';
  }
}

module.exports = Contractors;
