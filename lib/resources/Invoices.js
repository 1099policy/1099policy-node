'use strict';

const Resource = require('./Resource');

class Invoices extends Resource {
  constructor(apiKey, baseURL, options) {
    super(apiKey, baseURL, options);
    this.path = '/invoices';
  }
}

module.exports = Invoices;
