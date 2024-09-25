'use strict';

const Resource = require('./Resource');

class Webhooks extends Resource {
  constructor(apiKey, baseURL, options) {
    super(apiKey, baseURL, options);
    this.path = '/webhooks';
  }
}

module.exports = Webhooks;
