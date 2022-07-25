'use strict';

/**
 * Ten99policyError is the base error from which all other more specific Ten99policy errors derive.
 * Specifically for errors returned from Ten99policy's REST API.
 */
class Ten99policyError extends Error {
  constructor(raw = {}) {
    super(raw.message);
    this.type = this.constructor.name;

    this.raw = raw;
    this.rawType = raw.type;
    this.code = raw.code;
    this.doc_url = raw.doc_url;
    this.param = raw.param;
    this.detail = raw.detail;
    this.headers = raw.headers;
    this.requestId = raw.requestId;
    this.statusCode = raw.statusCode;
    this.message = raw.message;

    this.charge = raw.charge;
    this.decline_code = raw.decline_code;
    this.payment_intent = raw.payment_intent;
    this.payment_method = raw.payment_method;
    this.payment_method_type = raw.payment_method_type;
    this.setup_intent = raw.setup_intent;
    this.source = raw.source;
  }

  /**
   * Helper factory which takes raw ten99policy errors and outputs wrapping instances
   */
  static generate(rawTen99policyError) {
    switch (rawTen99policyError.type) {
      case 'card_error':
        return new Ten99policyCardError(rawTen99policyError);
      case 'invalid_request_error':
        return new Ten99policyInvalidRequestError(rawTen99policyError);
      case 'api_error':
        return new Ten99policyAPIError(rawTen99policyError);
      case 'authentication_error':
        return new Ten99policyAuthenticationError(rawTen99policyError);
      case 'rate_limit_error':
        return new Ten99policyRateLimitError(rawTen99policyError);
      case 'idempotency_error':
        return new Ten99policyIdempotencyError(rawTen99policyError);
      case 'invalid_grant':
        return new Ten99policyInvalidGrantError(rawTen99policyError);
      default:
        return new Ten99policyUnknownError(rawTen99policyError);
    }
  }
}

// Specific Ten99policy Error types:

/**
 * CardError is raised when a user enters a card that can't be charged for
 * some reason.
 */
class Ten99policyCardError extends Ten99policyError {}

/**
 * InvalidRequestError is raised when a request is initiated with invalid
 * parameters.
 */
class Ten99policyInvalidRequestError extends Ten99policyError {}

/**
 * APIError is a generic error that may be raised in cases where none of the
 * other named errors cover the problem. It could also be raised in the case
 * that a new error has been introduced in the API, but this version of the
 * Node.JS SDK doesn't know how to handle it.
 */
class Ten99policyAPIError extends Ten99policyError {}

/**
 * AuthenticationError is raised when invalid credentials are used to connect
 * to Ten99policy's servers.
 */
class Ten99policyAuthenticationError extends Ten99policyError {}

/**
 * PermissionError is raised in cases where access was attempted on a resource
 * that wasn't allowed.
 */
class Ten99policyPermissionError extends Ten99policyError {}

/**
 * RateLimitError is raised in cases where an account is putting too much load
 * on Ten99policy's API servers (usually by performing too many requests). Please
 * back off on request rate.
 */
class Ten99policyRateLimitError extends Ten99policyError {}

/**
 * Ten99policyConnectionError is raised in the event that the SDK can't connect to
 * Ten99policy's servers. That can be for a variety of different reasons from a
 * downed network to a bad TLS certificate.
 */
class Ten99policyConnectionError extends Ten99policyError {}

/**
 * SignatureVerificationError is raised when the signature verification for a
 * webhook fails
 */
class Ten99policySignatureVerificationError extends Ten99policyError {}

/**
 * IdempotencyError is raised in cases where an idempotency key was used
 * improperly.
 */
class Ten99policyIdempotencyError extends Ten99policyError {}

/**
 * InvalidGrantError is raised when a specified code doesn't exist, is
 * expired, has been used, or doesn't belong to you; a refresh token doesn't
 * exist, or doesn't belong to you; or if an API key's mode (live or test)
 * doesn't match the mode of a code or refresh token.
 */
class Ten99policyInvalidGrantError extends Ten99policyError {}

/**
 * Any other error from Ten99policy not specifically captured above
 */
class Ten99policyUnknownError extends Ten99policyError {}

module.exports.generate = Ten99policyError.generate;
module.exports.Ten99policyError = Ten99policyError;
module.exports.Ten99policyCardError = Ten99policyCardError;
module.exports.Ten99policyInvalidRequestError = Ten99policyInvalidRequestError;
module.exports.Ten99policyAPIError = Ten99policyAPIError;
module.exports.Ten99policyAuthenticationError = Ten99policyAuthenticationError;
module.exports.Ten99policyPermissionError = Ten99policyPermissionError;
module.exports.Ten99policyRateLimitError = Ten99policyRateLimitError;
module.exports.Ten99policyConnectionError = Ten99policyConnectionError;
module.exports.Ten99policySignatureVerificationError = Ten99policySignatureVerificationError;
module.exports.Ten99policyIdempotencyError = Ten99policyIdempotencyError;
module.exports.Ten99policyInvalidGrantError = Ten99policyInvalidGrantError;
module.exports.Ten99policyUnknownError = Ten99policyUnknownError;
