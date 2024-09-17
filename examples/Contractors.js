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
/* Creating a contractor
/* -----------------------------------------------------------------------------------*/

ten99policy.contractors
  .create({
    first_name: 'John',
    last_name: 'Doe',
    email: 'johnd@ddoe.com',
    phone: '415-111-1111',
    tax_identification: '123-456789',
    address: {
      country: 'USA',
      line1: '2211 Mission St',
      locality: 'San Francisco',
      region: 'CA',
      postalcode: '94110',
    },
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a contractor (replace xxx with an existing contractor id)
/* -----------------------------------------------------------------------------------*/

ten99policy.contractors
  .update('cn_tS3wR3UQ5q', {
    email: 'john.doe@gmail.com',
    first_name: 'George',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of contractors
/* -----------------------------------------------------------------------------------*/

ten99policy.contractors
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
/* Retrieving a contractor (replace xxx with an existing contractor id)
/* -----------------------------------------------------------------------------------*/

ten99policy.contractors
  .retrieve('cn_9TPKz6B9so')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting a contractor (replace xxx with an existing contractor id)
/* -----------------------------------------------------------------------------------*/

ten99policy.contractors
  .del('cn_tS3wR3UQ5q')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
