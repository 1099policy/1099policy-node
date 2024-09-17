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
/* Creating an assignment
/* -----------------------------------------------------------------------------------*/

ten99policy.assignments
  .create({
    contractor: "cn_kjLKMtApTv",
    job: "jb_D6ZSaoa2MV",
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating an assignment (replace xxx with an existing assignment id)
/* -----------------------------------------------------------------------------------*/

ten99policy.assignments
  .update('an_sF3yUB3BYY', {
    contractor: "cn_kjLKMtApTv",
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of assignments
/* -----------------------------------------------------------------------------------*/

ten99policy.assignments
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
/* Retrieving an assignment (replace xxx with an existing assignment id)
/* -----------------------------------------------------------------------------------*/

ten99policy.assignments
  .retrieve('an_sF3yUB3BYY')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting an assignment (replace xxx with an existing assignment id)
/* -----------------------------------------------------------------------------------*/

ten99policy.assignments
  .del('an_sF3yUB3BYY')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
