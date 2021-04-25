'use strict';

const Ten99PolicyResource = require('../Ten99PolicyResource');
// this is for handling non-basic endpoints
// const ten99policyMethod = Ten99PolicyResource.method;

module.exports = Ten99PolicyResource.extend({
  path: 'contractors',

  includeBasic: [
    'list',
    'retrieve',
    'create',
    'update',
    'del'
  ],

  // doSomethingWithTheContractor: ten99policyMethod({
  //   method: 'POST',
  //   path: '/{contractor}/task',
  // }),
});
