// File generated from our OpenAPI spec

'use strict';

const resourceNamespace = require('./ResourceNamespace');

module.exports = {
  Contractors: require('./resources/Contractors'),
  Entities: require('./resources/Entities'),
  Jobs: require('./resources/Jobs'),
  Policies: require('./resources/Policies'),
  Quotes: require('./resources/Quotes'),
  Events: require('./resources/Events'),
  Apply: resourceNamespace('apply', {
    Sessions: require('./resources/Apply/Sessions'),
  }),
};
