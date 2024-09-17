'use strict';
const { InvalidInputError, GeneralError } = require('../lib/errors'); // Import specific errors

/* -----------------------------------------------------------------------------------*/
/* Initialize Ten99Policy API client
/* -----------------------------------------------------------------------------------*/

const Ten99Policy = require('../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_c6a100e0-88b2-4548-a9ca-d4b681503946',
  environment: 'sandbox',
  logCurl: true,
});

/* -----------------------------------------------------------------------------------*/
/* Creating a quote
/* -----------------------------------------------------------------------------------*/

ten99policy.quotes
  .create({
    job: 'jb_jsb9KEcTpc',
    contractor: 'cn_yJBbMeq9QA',
    coverage_type: ['general', 'workers-comp'],
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a quote (replace xxx with an existing quote id)
/* -----------------------------------------------------------------------------------*/

ten99policy.quotes
  .update('qt_C9Z2DmfHSF', {
    name: 'Mechanic',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of quotes
/* -----------------------------------------------------------------------------------*/

ten99policy.quotes
  .list()
  .then((message) => console.log(message))
  .catch((error) => {
    if (error instanceof InvalidInputError) {
      console.error('Invalid input provided:', error.message);
    } else if (error instanceof GeneralError) {
      console.error('A general error occurred:', error.message);
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
  });

/* -----------------------------------------------------------------------------------*/
/* Retrieving a quote (replace xxx with an existing quote id)
/* -----------------------------------------------------------------------------------*/

ten99policy.quotes
  .retrieve('qt_C9Z2DmfHSF')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
