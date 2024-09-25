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
  /**
   * Handles the response from a Promise
   * @param {any} response - The resolved value of the Promise
   * @returns {void} This method doesn't return a value
   */
  .then((response) => console.log(response))
  /**
   * Catches and logs any errors that occur in the preceding Promise chain
   * @param {Error} error - The error object caught from the Promise rejection
   * @returns {void} This method does not return a value
   */
  ```
  /**
   * Handles the response from a Promise
   * @param {*} response - The resolved value from the Promise
   * @returns {void} This method doesn't return anything
   */
  ```
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a job (replace xxx with an existing job id)
/* -----------------------------------------------------------------------------------*/

ten99policy.jobs
  .update('jb_C9Z2DmfHSF', {
    name: 'Mechanic',
  })
  .then((response) => console.log(response))
  /**
   * Catches and logs any errors that occur in the preceding Promise chain
   * @param {Error} error - The error object caught from the Promise rejection
   * @returns {void} This method doesn't return anything
   */
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of jobs
/* -----------------------------------------------------------------------------------*/

ten99policy.jobs
  .list()
  /**
   ```
   /**
    * Catches and handles errors thrown during the execution of the previous operation
    * @param {Error} error - The error object caught by the catch block
    * @returns {void} This function doesn't return a value
    */
   ```
   * Logs the received message to the console
   * @param {any} message - The message to be logged
   * @returns {void} This method does not return a value
   */
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
  ```
  /**
   * Handles the response from a previous Promise
   * @param {*} response - The response received from the Promise
   * @returns {void} This function does not return a value
   */
  ```
  .then((response) => console.log(response))
  /**
   * Catches and logs any errors that occur in the preceding Promise chain
   * @param {Error} error - The error object caught from the Promise rejection
   * @returns {void} This method doesn't return anything
   */
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting a job (replace xxx with an existing job id)
/* -----------------------------------------------------------------------------------*/

ten99policy.jobs
  .del('jb_C9Z2DmfHSF')
  ```
  /**
   * Handles the response from a promise
   * @param {Object} response - The response object from the resolved promise
   * @returns {void} This method doesn't return anything, it logs the response to the console
   */
  ```
  .then((response) => console.log(response))
  /**
   * Catches and logs any errors that occur in the preceding Promise chain
   * @param {Error} error - The error object thrown by the previous Promise
   * @returns {void} This method doesn't return anything
   */
  .catch((error) => console.error(error));
