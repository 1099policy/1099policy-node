'use strict';

const Resource = require('./Resource');

class Webhooks extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/webhook_endpoints';
  }
}

module.exports = Webhooks;
