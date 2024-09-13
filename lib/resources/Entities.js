'use strict';

const Resource = require('./Resource');

class Entities extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/entities';
  }
}

module.exports = Entities;
