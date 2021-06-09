'use strict';

/**
 * Ten99PolicyError is the base error from which all other more specific Ten99Policy errors derive.
 * Specifically for errors returned from Ten99Policy's REST API.
 */
class Ten99PolicyError extends Error {
  constructor(raw = {}) {
    super(raw.message);
    this.type = this.constructor.name;

    this.raw = raw;
    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.headers = raw.headers;
    this.statusCode = raw.statusCode;
    this.message = raw.message;
  }

  /**
   * Helper factory which takes raw ten99policy errors and outputs wrapping instances
   */
  static generate(rawTen99PolicyError) {
    switch (rawTen99PolicyError.type) {
      case 'Invalid contractor id':
        return new Ten99PolicyInvalidContractorIdError(rawTen99PolicyError);
      case 'invalid_request_error':
        return new Ten99PolicyInvalidRequestError(rawTen99PolicyError);
      case 'api_error':
        return new Ten99PolicyAPIError(rawTen99PolicyError);
      case 'authentication_error':
        return new Ten99PolicyAuthenticationError(rawTen99PolicyError);
      case 'rate_limit_error':
        return new Ten99PolicyRateLimitError(rawTen99PolicyError);
      case 'idempotency_error':
        return new Ten99PolicyIdempotencyError(rawTen99PolicyError);
      case 'invalid_grant':
        return new Ten99PolicyInvalidGrantError(rawTen99PolicyError);
      default:
        return new Ten99PolicyError(rawTen99PolicyError);
    }
  }
}

// Specific Ten99Policy Error types:

/**
 * CardError is raised when a user enters a card that can't be charged for
 * some reason.
 */
class Ten99PolicyInvalidContractorIdError extends Ten99PolicyError {}

/**
 * InvalidRequestError is raised when a request is initiated with invalid
 * parameters.
 */
class Ten99PolicyInvalidRequestError extends Ten99PolicyError {}

/**
 * APIError is a generic error that may be raised in cases where none of the
 * other named errors cover the problem. It could also be raised in the case
 * that a new error has been introduced in the API, but this version of the
 * Node.JS SDK doesn't know how to handle it.
 */
class Ten99PolicyAPIError extends Ten99PolicyError {}

/**
 * AuthenticationError is raised when invalid credentials are used to connect
 * to Ten99Policy's servers.
 */
class Ten99PolicyAuthenticationError extends Ten99PolicyError {}

/**
 * PermissionError is raised in cases where access was attempted on a resource
 * that wasn't allowed.
 */
class Ten99PolicyPermissionError extends Ten99PolicyError {}

/**
 * RateLimitError is raised in cases where an account is putting too much load
 * on Ten99Policy's API servers (usually by performing too many requests). Please
 * back off on request rate.
 */
class Ten99PolicyRateLimitError extends Ten99PolicyError {}

/**
 * Ten99PolicyConnectionError is raised in the event that the SDK can't connect to
 * Ten99Policy's servers. That can be for a variety of different reasons from a
 * downed network to a bad TLS certificate.
 */
class Ten99PolicyConnectionError extends Ten99PolicyError {}

/**
 * SignatureVerificationError is raised when the signature verification for a
 * webhook fails
 */
class Ten99PolicySignatureVerificationError extends Ten99PolicyError {}

/**
 * IdempotencyError is raised in cases where an idempotency key was used
 * improperly.
 */
class Ten99PolicyIdempotencyError extends Ten99PolicyError {}

/**
 * InvalidGrantError is raised when a specified code doesn't exist, is
 * expired, has been used, or doesn't belong to you; a refresh token doesn't
 * exist, or doesn't belong to you; or if an API key's mode (live or test)
 * doesn't match the mode of a code or refresh token.
 */
class Ten99PolicyInvalidGrantError extends Ten99PolicyError {}

module.exports.generate = Ten99PolicyError.generate;
module.exports.Ten99PolicyError = Ten99PolicyError;
module.exports.Ten99PolicyInvalidContractorIdError = Ten99PolicyInvalidContractorIdError;
module.exports.Ten99PolicyInvalidRequestError = Ten99PolicyInvalidRequestError;
module.exports.Ten99PolicyAPIError = Ten99PolicyAPIError;
module.exports.Ten99PolicyAuthenticationError = Ten99PolicyAuthenticationError;
module.exports.Ten99PolicyPermissionError = Ten99PolicyPermissionError;
module.exports.Ten99PolicyRateLimitError = Ten99PolicyRateLimitError;
module.exports.Ten99PolicyConnectionError = Ten99PolicyConnectionError;
module.exports.Ten99PolicySignatureVerificationError = Ten99PolicySignatureVerificationError;
module.exports.Ten99PolicyIdempotencyError = Ten99PolicyIdempotencyError;
module.exports.Ten99PolicyInvalidGrantError = Ten99PolicyInvalidGrantError;
