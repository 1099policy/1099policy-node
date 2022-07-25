// File generated from our OpenAPI spec

'use strict';

const Ten99policyResource = require('../../Ten99policyResource');
const ten99policyMethod = Ten99policyResource.method;

module.exports = Ten99policyResource.extend({
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
