'use strict';

const Ten99PolicyResource = require('../Ten99PolicyResource');
const ten99policyMethod = Ten99PolicyResource.method;

module.exports = Ten99PolicyResource.extend({
  path: 'contractors',

  create: ten99policyMethod({
    method: 'POST',
    path: '',
  }),

  retrieve: ten99policyMethod({
    method: 'GET',
    path: '/{id}',
  }),

  update: ten99policyMethod({
    method: 'PUT',
    path: '/{id}',
  }),

  list: ten99policyMethod({
    method: 'GET',
    path: '',
    methodType: 'list',
  }),

  del: ten99policyMethod({
    method: 'DELETE',
    path: '/{id}',
  }),
});
