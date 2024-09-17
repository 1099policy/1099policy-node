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
/* Creating a policy
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .create({
    quote_id: 'qt_UPmEfS6nNK',
    is_active: true,
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a policy (replace xxx with an existing policy id)
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .update('en_C9Z2DmfHSF', {
    is_active: false,
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of policies
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
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
/* Retrieving a policy (replace xxx with an existing policy id)
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .retrieve('en_C9Z2DmfHSF')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting a policy (replace xxx with an existing policy id)
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .del('en_C9Z2DmfHSF')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
