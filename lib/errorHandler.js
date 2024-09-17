'use strict';

const errors = require('./errors');

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
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Error';

  const ExceptionClass = errors[className] || errors.Ten99PolicyError;

  return new ExceptionClass(errorData.message || 'An error occurred', rbody, rcode, resp, rheaders);
}

module.exports = { decideApiError };
