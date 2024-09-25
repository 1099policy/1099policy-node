'use strict';

const errors = require('./errors');

/**
 * Decides which API error to return based on the error data received from the API response.
 * @param {Object} errorData - The error data object from the API response.
 * @param {string|Object} rbody - The raw response body.
 * @param {number} rcode - The response status code.
 * @param {Object} resp - The full response object.
 * @param {Object} rheaders - The response headers.
 * @returns {Error} An instance of the appropriate error class based on the error code.
 */
function decideApiError(errorData, rbody, rcode, resp, rheaders) {
  const errorCode = errorData.error_code ? errorData.error_code : null;

  if (!errorCode || typeof errorCode !== 'string') {
    console.warn('Warning: No valid error_code provided in the API response. Defaulting to Ten99PolicyError.');
    return new errors.Ten99PolicyError(
      errorData.message || 'An error occurred',
      rbody,
      rcode,
      resp,
      rheaders
    );
  }

  const className = errorCode
    .split('_')
    /**
     * Capitalizes the first letter of each word in an array of strings.
     * @param {string[]} words - An array of words to be capitalized.
     * @returns {string[]} A new array with each word capitalized.
     */
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Error';

  const ExceptionClass = errors[className] || errors.Ten99PolicyError;

  return new ExceptionClass(errorData.message || 'An error occurred', rbody, rcode, resp, rheaders);
}

module.exports = { decideApiError };
