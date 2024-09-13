'use strict';

class Ten99PolicyError extends Error {
  constructor(message, rbody, rcode, resp, rheaders) {
    super(message);
    this.name = this.constructor.name;
    this.rbody = rbody;
    this.rcode = rcode;
    this.resp = resp;
    this.rheaders = rheaders;
  }
}

// Define all the custom error classes
class GeneralError extends Ten99PolicyError {}
class InvalidApiKeyError extends Ten99PolicyError {}
class AuthTokenExpiredError extends Ten99PolicyError {}
class ResourceNotFoundError extends Ten99PolicyError {}
class DatabaseOperationalError extends Ten99PolicyError {}
class InsufficientPermissionsError extends Ten99PolicyError {}
class NoTenantFoundError extends Ten99PolicyError {}
class InvalidWebhookSignatureError extends Ten99PolicyError {}
class InvalidInputError extends Ten99PolicyError {}
class BadRequestError extends Ten99PolicyError {}
class InvalidQuoteIdError extends Ten99PolicyError {}
class InvalidSessionIdError extends Ten99PolicyError {}
class SessionExpiredError extends Ten99PolicyError {}
class ApplicationAlreadyCompleteError extends Ten99PolicyError {}
class EffectiveDateInvalidError extends Ten99PolicyError {}
class EndDateInvalidError extends Ten99PolicyError {}
class InvalidContractorIdError extends Ten99PolicyError {}
class InvalidPolicyIdError extends Ten99PolicyError {}
class InvalidJobIdError extends Ten99PolicyError {}
class JobIsUsedError extends Ten99PolicyError {}
class InvalidAssignmentIdError extends Ten99PolicyError {}
class InvoiceAlreadyPaidError extends Ten99PolicyError {}
class MissingCertificatesError extends Ten99PolicyError {}
class InvalidFileTypeError extends Ten99PolicyError {}
class DuplicateEmailError extends Ten99PolicyError {}
class InvalidEntityIdError extends Ten99PolicyError {}
class InvalidEventIdError extends Ten99PolicyError {}
class InvalidPaycycleStartdateError extends Ten99PolicyError {}
class InvalidPaycycleEnddateError extends Ten99PolicyError {}
class NoActivePolicyError extends Ten99PolicyError {}
class AgencyPayInvoiceExistsError extends Ten99PolicyError {}
class InvalidInvoiceIdError extends Ten99PolicyError {}
class MissingJobCategoryCodeError extends Ten99PolicyError {}
class InvalidJobCategoryIdError extends Ten99PolicyError {}
class JobCategoryNotApprovedError extends Ten99PolicyError {}
class InvoiceExistsError extends Ten99PolicyError {}
class CustomApplicationsDisabledError extends Ten99PolicyError {}
class ContractHasMatchingPolicyError extends Ten99PolicyError {}
class CantUpdateCreateNewQuoteError extends Ten99PolicyError {}
class PolicyAlreadyExistsError extends Ten99PolicyError {}
class InvalidWebhookEndpointIdError extends Ten99PolicyError {}
class MissingContractorIdError extends Ten99PolicyError {}
class MissingCertificateError extends Ten99PolicyError {}
class NoCoverageRuleFoundError extends Ten99PolicyError {}
class InvalidMimeTypeError extends Ten99PolicyError {}
class InvalidFileSizeError extends Ten99PolicyError {}

// Export all error classes
module.exports = {
  Ten99PolicyError,
  GeneralError,
  InvalidApiKeyError,
  AuthTokenExpiredError,
  ResourceNotFoundError,
  DatabaseOperationalError,
  InsufficientPermissionsError,
  NoTenantFoundError,
  InvalidWebhookSignatureError,
  InvalidInputError,
  BadRequestError,
  InvalidQuoteIdError,
  InvalidSessionIdError,
  SessionExpiredError,
  ApplicationAlreadyCompleteError,
  EffectiveDateInvalidError,
  EndDateInvalidError,
  InvalidContractorIdError,
  InvalidPolicyIdError,
  InvalidJobIdError,
  JobIsUsedError,
  InvalidAssignmentIdError,
  InvoiceAlreadyPaidError,
  MissingCertificatesError,
  InvalidFileTypeError,
  DuplicateEmailError,
  InvalidEntityIdError,
  InvalidEventIdError,
  InvalidPaycycleStartdateError,
  InvalidPaycycleEnddateError,
  NoActivePolicyError,
  AgencyPayInvoiceExistsError,
  InvalidInvoiceIdError,
  MissingJobCategoryCodeError,
  InvalidJobCategoryIdError,
  JobCategoryNotApprovedError,
  InvoiceExistsError,
  CustomApplicationsDisabledError,
  ContractHasMatchingPolicyError,
  CantUpdateCreateNewQuoteError,
  PolicyAlreadyExistsError,
  InvalidWebhookEndpointIdError,
  MissingContractorIdError,
  MissingCertificateError,
  NoCoverageRuleFoundError,
  InvalidMimeTypeError,
  InvalidFileSizeError,
};
