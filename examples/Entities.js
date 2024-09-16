'use strict';

/* -----------------------------------------------------------------------------------*/
/* Initialize Ten99Policy API client
/* -----------------------------------------------------------------------------------*/

const Ten99Policy = require('../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_c6a100e0-88b2-4548-a9ca-d4b681503946',
  host: '127.0.0.1',
  port: '5000',
  protocol: 'http',
  environment: 'sandbox',
  logCurl: true,
});

/* -----------------------------------------------------------------------------------*/
/* Creating an entity
/* -----------------------------------------------------------------------------------*/

ten99policy.entities
  .create({
    name: 'Brooklyn Bowl',
    coverage_limit: {
      aggregate_limit: '200000000',
      occurrence_limit: '100000000',
    },
    address: {
      line1: '3639 18th St',
      locality: 'San Francisco',
      region: 'CA',
      postalcode: '94110',
    },
    required_coverage: ['general', 'workers-comp'],
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating an entity (replace xxx with an existing entity id)
/* -----------------------------------------------------------------------------------*/

ten99policy.entities
  .update('en_C9Z2DmfHSF', {
    name: 'California Roll',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of entities
/* -----------------------------------------------------------------------------------*/

ten99policy.entities
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving an entity (replace xxx with an existing entity id)
/* -----------------------------------------------------------------------------------*/

ten99policy.entities
  .retrieve('en_BUcNa8jMrq')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting an entity (replace xxx with an existing entity id)
/* -----------------------------------------------------------------------------------*/

ten99policy.entities
  .del('en_C9Z2DmfHSF')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
