'use strict';

const ten99policyMethod = require('./Ten99policyMethod');

// DEPRECATED: These were kept for backwards compatibility in case users were
// using this, but basic methods are now explicitly defined on a resource.
module.exports = {
  create: ten99policyMethod({
    method: 'POST',
  }),

  list: ten99policyMethod({
    method: 'GET',
    methodType: 'list',
  }),

  retrieve: ten99policyMethod({
    method: 'GET',
    path: '/{id}',
  }),

  update: ten99policyMethod({
    method: 'POST',
    path: '{id}',
  }),

  // Avoid 'delete' keyword in JS
  del: ten99policyMethod({
    method: 'DELETE',
    path: '{id}',
  }),
};
