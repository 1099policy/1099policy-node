'use strict';

const errors = require('./errors');

// Function to decide which specific error to throw
function decideApiError(errorData, rbody, rcode, resp, rheaders) {
  const errorCode = errorData.error_code; // Assuming error_code is provided in the API response
  const className = errorCode
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Error';

  const ExceptionClass = errors[className] || errors.Ten99PolicyError;

  return new ExceptionClass(errorData.message, rbody, rcode, resp, rheaders);
}

module.exports = { decideApiError };