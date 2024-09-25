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
  /**
   * Handles the response from a Promise
   * @param {Object} response - The response object from the resolved Promise
   * @returns {undefined} This method doesn't return a value, it logs the response to the console
   */
  .then((response) => console.log(response))
  ```
  /**
   * Catches and logs any errors that occur in the preceding Promise chain
   * @param {Error} error - The error object caught from the Promise rejection
   * @returns {void} This method doesn't return anything
   */
  ```
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a policy (replace xxx with an existing policy id)
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .update('en_C9Z2DmfHSF', {
    is_active: false,
  })
  ```
  /**
   * Handles the response from a promise and logs it to the console
   * @param {*} response - The response received from the promise
   * @returns {undefined} This method doesn't return a value
   */
  ```
  .then((response) => console.log(response))
  /**
   * Handles and logs errors that occur during promise execution
   * @param {Error} error - The error object caught by the catch block
   * @returns {void} This method doesn't return anything
   */
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of policies
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .list()
  /**
   * Logs a message to the console
   * @param {any} message - The message to be logged
   * @returns {void} This method does not return anything
   */
  .then((message) => console.log(message))
  /**
   * Handles errors caught in a Promise chain
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
/**
 * Handles the response from a Promise
 * @param {*} response - The resolved value of the Promise
 * @returns {undefined} This method does not return a value
 */
/* Retrieving a policy (replace xxx with an existing policy id)
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .retrieve('en_C9Z2DmfHSF')
  .then((response) => console.log(response))
  /**
   * Catches and logs any errors that occur in the preceding Promise chain
   * @param {Error} error - The error object caught from the Promise rejection
   * @returns {void} This method doesn't return anything
   */
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting a policy (replace xxx with an existing policy id)
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .del('en_C9Z2DmfHSF')
  /**
   ```
   /**
    * Catches and logs any errors that occur in the preceding Promise chain
    * @param {Error} error - The error object caught from the Promise rejection
    * @returns {void} This method doesn't return anything
    */
   ```
   * Handles the response from a Promise
   * @param {Response} response - The response object received from the Promise
   * @returns {void} This method doesn't return anything, it logs the response to the console
   */
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
