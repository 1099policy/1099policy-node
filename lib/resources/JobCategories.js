'use strict';

const Resource = require('./Resource');

class JobCategories extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/category_codes';
  }
}

module.exports = JobCategories;
