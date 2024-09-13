'use strict';
const { InvalidInputError, GeneralError } = require('../lib/errors'); // Import specific errors

/* -----------------------------------------------------------------------------------*/
/* Initialize 1099Policy API client
/*-----------------------------------------------------------------------------------*/

const Ten99Policy = require('../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_c6a100e0-88b2-4548-a9ca-d4b681503946',
  host: '127.0.0.1',
  port: '5000',
  protocol: 'http',
  environment: 'production',
  idempotencyKey: 'unique-key-123', // Optional
  logCurl: true, // Enable curl logging
});

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of contractors
/*----------------------------------------------------------------------------------*/

ten99policy.contractors
  .list({ starting_after: 'x', ending_before: 'y' }, { 'Custom-Header': 'CustomValue' })
  .then((message) => console.log(message))
  .catch((error) => {
    // Handle specific error types
    if (error instanceof InvalidInputError) {
      console.error('Invalid input provided:', error.message);
    } else if (error instanceof GeneralError) {
      console.error('A general error occurred:', error.message);
    } else {
      // Handle any other errors
      console.error('An unexpected error occurred:', error.message);
    }
  });