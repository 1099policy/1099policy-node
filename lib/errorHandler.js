'use strict';

const errors = require('./errors');

function handleError(error) {
  if (error.response) {
    throw new errors.APIError(error.response.data.error, error.response.status);
  } else {
    throw new errors.Ten99PolicyError(error.message);
  }
}

module.exports = { handleError };
