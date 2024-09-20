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
/* Creating a webhook
/* -----------------------------------------------------------------------------------*/

ten99policy.webhooks
  .create({
    url: 'https://webhook.site/1b1b1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
    description: 'My First Webhook',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a webhook (replace xxx with an existing webhook id)
/* -----------------------------------------------------------------------------------*/

ten99policy.webhooks
.update('whe_MfDe1BHyLyMV1oau9kTdg2', {
  url: 'https://webhook.site/1b1b1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b',
  description: 'My First Webhook (Updated)',
})
.then((response) => console.log(response))
.catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of webhooks
/* -----------------------------------------------------------------------------------*/

ten99policy.webhooks
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
/* Retrieving a webhook (replace xxx with an existing webhook id)
/* -----------------------------------------------------------------------------------*/

ten99policy.webhooks
.retrieve('whe_MfDe1BHyLyMV1oau9kTdg2')
.then((response) => console.log(response))
.catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting a webhook (replace xxx with an existing webhook id)
/* -----------------------------------------------------------------------------------*/

ten99policy.webhooks
  .del('whe_MfDe1BHyLyMV1oau9kTdg2')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
