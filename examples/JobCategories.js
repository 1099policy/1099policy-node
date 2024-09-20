'use strict';
const { InvalidInputError, GeneralError } = require('../lib/errors.js'); // Import specific errors

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
/* Fetching the list of job categories
/* -----------------------------------------------------------------------------------*/

ten99policy.jobCategories
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
