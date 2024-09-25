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
/* Creating a quote
/* -----------------------------------------------------------------------------------*/

ten99policy.quotes
  .create({
    job: 'jb_jsb9KEcTpc',
    contractor: 'cn_yJBbMeq9QA',
    coverage_type: ['general', 'workers-comp'],
  })
  ```
  ```
  /**
   * Catches and logs any errors that occur in the preceding Promise chain
   * @param {Error} error - The error object caught from the rejected Promise
   * @returns {void} This method doesn't return anything
   */
  ```
  /**
   * Handles the response from a Promise
   * @param {Object} response - The response object received from the Promise
   * @returns {undefined} This function does not return a value
   */
  ```
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a quote (replace xxx with an existing quote id)
/**
 * Catches and logs any errors that occur in the preceding Promise chain
 * @param {Error} error - The error object caught from the Promise rejection
 * @returns {void} This method doesn't return anything
 */
/* -----------------------------------------------------------------------------------*/

ten99policy.quotes
  .update('qt_C9Z2DmfHSF', {
    name: 'Mechanic',
  })
  /**
   * Logs the response to the console
   * @param {any} response - The response received from the previous promise
   * @returns {void} This method does not return a value
   */
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/**
 * Logs the provided message to the console
 * @param {any} message - The message to be logged
 * @returns {void} This function does not return a value
 */
/* Fetching the list of quotes
/* -----------------------------------------------------------------------------------*/

ten99policy.quotes
  .list()
  .then((message) => console.log(message))
  /**
   * Handles errors caught in a promise chain
   * @param {Error} error - The error object caught in the catch block
   * @returns {void} This function doesn't return a value
   */
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
/* Retrieving a quote (replace xxx with an existing quote id)
/* -----------------------------------------------------------------------------------*/

ten99policy.quotes
  .retrieve('qt_C9Z2DmfHSF')
  ```
  /**
   * Handles the response from a Promise
   * @param {any} response - The resolved value from the Promise
   * @returns {void} This method doesn't return a value
   */
  ```
  .then((response) => console.log(response))
  ```
  /**
   * Catches and logs any errors that occur in the preceding Promise chain
   * @param {Error} error - The error object thrown by the Promise chain
   * @returns {void} This method does not return a value
   */
  ```
  .catch((error) => console.error(error));
