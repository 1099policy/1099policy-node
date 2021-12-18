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
/* Creating a quote
/*-----------------------------------------------------------------------------------*/

ten99policy.quotes
  .create({
    job_id: 'xxx',
    contractor_id: 'xxx',
    coverage_type: 'general',
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a quote (replace xxx with an existing quote id)
/*-----------------------------------------------------------------------------------*/

ten99policy.quotes
  .update('xxx', {
    coverage_type: 'general',
    effective_date: '2019-07-11',
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of quotes
/*-----------------------------------------------------------------------------------*/

ten99policy.quotes
  .list()
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving a quote (replace xxx with an existing quote id)
/*-----------------------------------------------------------------------------------*/

ten99policy.quotes
  .retrieve('xxx')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
