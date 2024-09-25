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
  /**
   * Handles the response from a promise
   * @param {Object} response - The response object received from the promise
   * @returns {undefined} This method doesn't return a value, it logs the response to the console
   */
  .then((response) => console.log(response))
  /**
   * Catches and logs any errors that occur in the preceding Promise chain.
   * @param {Error} error - The error object thrown by the preceding Promise rejection.
   * @returns {void} This method doesn't return anything.
   */
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a webhook (replace xxx with an existing webhook id)
/* -----------------------------------------------------------------------------------*/

/**
 /**
  * Catches and logs any errors that occur in the preceding Promise chain
  * @param {Error} error - The error object caught from the Promise rejection
  * @returns {void} This method doesn't return anything
  */
 * Handles the response from a Promise
 * @param {Promise} response - The resolved value of the Promise
 * @returns {void} Logs the response to the console
 */
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
/**
 * Handles the resolved value of a Promise and logs it to the console
 * @param {any} message - The resolved value of the Promise
 * @returns {undefined} This method does not return a value
 */
.then((message) => console.log(message))
```
/**
 * Handles errors caught in a Promise catch block
 * @param {Error} error - The error object caught by the catch block
 * @returns {void} This function doesn't return a value
 */
```
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
/**
 /**
  * Catches and logs any errors that occur in the preceding Promise chain
  * @param {Error} error - The error object caught from the rejected Promise
  * @returns {void} This method doesn't return anything
  */
 * Handles the response from a Promise
 * @param {Function} console.log - The logging function to output the response
 * @returns {undefined} This method doesn't return a value
 /**
  /**
   * Catches and logs any errors that occur in the preceding Promise chain
   * @param {Error} error - The error object caught from the Promise rejection
   * @returns {void} This method doesn't return anything
   */
  * Handles the response from a Promise
  * @param {*} response - The resolved value from the Promise
  * @returns {void} This method doesn't return anything
  */
 */
.then((response) => console.log(response))
.catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting a webhook (replace xxx with an existing webhook id)
/* -----------------------------------------------------------------------------------*/

ten99policy.webhooks
  .del('whe_MfDe1BHyLyMV1oau9kTdg2')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
