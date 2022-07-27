'use strict';

const Ten99PolicyResource = require('../Ten99PolicyResource');
const ten99policyMethod = Ten99PolicyResource.method;

module.exports = Ten99PolicyResource.extend({
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
