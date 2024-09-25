'use strict';

class Ten99PolicyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Ten99PolicyError';
  }
}

class APIError extends Ten99PolicyError {
  constructor(message, statusCode) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

module.exports = {
  Ten99PolicyError,
  APIError
};
