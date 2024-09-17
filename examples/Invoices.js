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
/* Creating an invoice
/* -----------------------------------------------------------------------------------*/

ten99policy.invoices
  .create({
    contractor: 'cn_AWcQPecvx5',
    job: 'jb_jW24jp6GYb',
    gross_pay: 1000,
    paycycle_startdate: 1725494400,
    paycycle_enddate: 1735494400,
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));


/* -----------------------------------------------------------------------------------*/
/* Updating an invoice (replace xxx with an existing invoice id)
/* -----------------------------------------------------------------------------------*/

ten99policy.invoices
  .update('in_m47rNFQ3PS', {
    gross_pay: 1500,
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of invoices
/* -----------------------------------------------------------------------------------*/

ten99policy.invoices
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
/* Retrieving an invoice (replace xxx with an existing invoice id)
/* -----------------------------------------------------------------------------------*/

ten99policy.invoices
  .retrieve('in_m47rNFQ3PS')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting an invoice (replace xxx with an existing invoice id)
/* -----------------------------------------------------------------------------------*/

ten99policy.invoices
  .del('in_m47rNFQ3PS')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
