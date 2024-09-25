'use strict';

const Resource = require('./Resource');

class Entities extends Resource {
  constructor(apiKey, baseURL, options) {
    super(apiKey, baseURL, options);
    this.path = '/entities';
  }
}

module.exports = Entities;
