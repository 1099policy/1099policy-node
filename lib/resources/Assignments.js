'use strict';

const Resource = require('./Resource');

class Assignments extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/assignments';
  }
}

module.exports = Assignments;
