'use strict';

/* -----------------------------------------------------------------------------------*/
/* Initialize Ten99Policy API client
/* -----------------------------------------------------------------------------------*/

const Ten99Policy = require('../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_c6a100e0-88b2-4548-a9ca-d4b681503946',
  host: '127.0.0.1',
  port: '5000',
  protocol: 'http',
  environment: 'sandbox',
  logCurl: true,
});

/* -----------------------------------------------------------------------------------*/
/* Creating an invoice
/* -----------------------------------------------------------------------------------*/

ten99policy.invoices
  .create({
    contractor: 'cn_ti8eXviE4A',
    job: 'jb_rajdrwMUKi',
    gross_pay: 1000,
    paycycle_startdate: '2022-04-25T22:23:13+00:00',
    paycycle_enddate: '2022-04-28T22:23:13+00:00',
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
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving an invoice (replace xxx with an existing invoice id)
/* -----------------------------------------------------------------------------------*/

ten99policy.invoices
  .retrieve('in_tcbma8oShU')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting an invoice (replace xxx with an existing invoice id)
/* -----------------------------------------------------------------------------------*/

ten99policy.invoices
  .del('in_tcbma8oShU')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
