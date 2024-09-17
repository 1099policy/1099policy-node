'use strict';

const Resource = require('./Resource');

class Invoices extends Resource {
  constructor(apiKey, baseURL, options = {}) {
    super(apiKey, baseURL, options);
    this.resourcePath = '/invoices';
  }
}

module.exports = Invoices;
