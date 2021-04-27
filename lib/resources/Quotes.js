'use strict';

const Ten99PolicyResource = require('../Ten99PolicyResource');

module.exports = Ten99PolicyResource.extend({
  path: 'quotes',

  includeBasic: [
    'list',
    'retrieve',
    'create',
    'update',
    'del'
  ],
});
