'use strict';

const Ten99policyResource = require('../Ten99policyResource');
const ten99policyMethod = Ten99policyResource.method;

module.exports = Ten99policyResource.extend({
  path: 'events',

  retrieve: ten99policyMethod({
    method: 'GET',
    path: '/{id}',
  }),

  list: ten99policyMethod({
    method: 'GET',
    path: '',
    methodType: 'list',
  }),
});
