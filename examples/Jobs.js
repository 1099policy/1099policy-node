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
/* Creating a job
/* -----------------------------------------------------------------------------------*/

ten99policy.jobs
  .create({
    name: 'Truck driver',
    description: 'Requires a truck',
    duration_hours: 20,
    wage: 100,
    years_experience: 20,
    wage_type: 'flatfee',
    entity: 'en_FwZfQRe4aW',
    category_code: 'jc_MTqpkbkp6G',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a job (replace xxx with an existing job id)
/* -----------------------------------------------------------------------------------*/

ten99policy.jobs
  .update('jb_C9Z2DmfHSF', {
    name: 'Mechanic',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of jobs
/* -----------------------------------------------------------------------------------*/

ten99policy.jobs
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
/* Retrieving a job (replace xxx with an existing job id)
/* -----------------------------------------------------------------------------------*/

ten99policy.jobs
  .retrieve('jb_C9Z2DmfHSF')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting a job (replace xxx with an existing job id)
/* -----------------------------------------------------------------------------------*/

ten99policy.jobs
  .del('jb_C9Z2DmfHSF')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
