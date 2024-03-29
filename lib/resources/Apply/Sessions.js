// File generated from our OpenAPI spec

'use strict';

const Ten99PolicyResource = require('../../Ten99PolicyResource');
const ten99policyMethod = Ten99PolicyResource.method;

module.exports = Ten99PolicyResource.extend({
  path: 'apply/sessions',

  create: ten99policyMethod({
    method: 'POST',
    path: '',
  }),

  retrieve: ten99policyMethod({
    method: 'GET',
    path: '/{session}',
  }),

  update: ten99policyMethod({
    method: 'POST',
    path: '/{session}',
  }),

  list: ten99policyMethod({
    method: 'GET',
    path: '',
    methodType: 'list',
  }),

  del: ten99policyMethod({
    method: 'DELETE',
    path: '/{session}',
  }),
});
