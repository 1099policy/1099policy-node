'use strict';

/* -----------------------------------------------------------------------------------*/
/* Initialize 1099Policy API client
/*-----------------------------------------------------------------------------------*/

const Ten99Policy = require('../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca',
  host: '127.0.0.1',
  port: '5000',
  protocol: 'http',
  environment: 'sandbox',
});

/* -----------------------------------------------------------------------------------*/
/* Creating a job
/*-----------------------------------------------------------------------------------*/

ten99policy.jobs
  .create({
    name: 'Truck driver',
    description: 'Requires a truck',
    duration_hours: 20,
    wage: 100,
    years_experience: 20,
    wage_type: 'flatfee',
    entity_id: 'en_KSANLvPtWF',
    category_code: 'xxx',
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a job (replace xxx with an existing job id)
/*-----------------------------------------------------------------------------------*/

ten99policy.jobs
  .update('xxx', {
    description: 'A very fast train',
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of jobs
/*-----------------------------------------------------------------------------------*/

ten99policy.jobs
  .list()
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving a job (replace xxx with an existing job id)
/*-----------------------------------------------------------------------------------*/

ten99policy.jobs
  .retrieve('xxx')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Delete a job (replace xxx with an existing job id)
/*-----------------------------------------------------------------------------------*/

ten99policy.jobs
  .del('xxx')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
