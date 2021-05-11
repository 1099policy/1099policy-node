'use strict';

/* -----------------------------------------------------------------------------------*/
/* Initialize 1099Policy API client
/*-----------------------------------------------------------------------------------*/

const T99P = require('../lib/ten99policy.js');
const ten99policy = new T99P({
  key: 't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca',
  host: 'localhost',
  port: '5000',
  protocol: 'http',
});

/* -----------------------------------------------------------------------------------*/
/* Creating an entity
/*-----------------------------------------------------------------------------------*/

ten99policy.entities
  .create({
    name: 'Brooklyn Bowl',
    coverage_limit: {
      aggregate_limit: '200000000',
      occurrence_limit: '100000000',
    },
    address: {
      line1: '3639 18th St',
      line2: '',
      locality: 'San Francisco',
      region: 'CA',
      postalcode: '94110',
    },
    required_coverage: ['general', 'workers-comp'],
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating an entity (replace xxx with an existing entity id)
/*-----------------------------------------------------------------------------------*/

ten99policy.entities
  .update('en_KSANLvPtWF', {
    name: 'Test ABC Inc',
    address: {
      line1: 'Test Sesame St.',
    },
    coverage_limit: {
      aggregate_limit: 100,
    },
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of entities
/*-----------------------------------------------------------------------------------*/

ten99policy.entities
  .list()
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving an entity (replace xxx with an existing entity id)
/*-----------------------------------------------------------------------------------*/

ten99policy.entities
  .retrieve('xxx')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Delete an entity (replace xxx with an existing entity id)
/*-----------------------------------------------------------------------------------*/

ten99policy.entities
  .del('xxx')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
