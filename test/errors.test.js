const errors = require('../lib/errors');

describe('errors', () => {
  test('Ten99PolicyError has correct properties', () => {
    const error = new errors.Ten99PolicyError('Test error');
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('Ten99PolicyError');
  });

  test('BadRequestError has correct properties', () => {
    const error = new errors.BadRequestError('Bad request');
    expect(error.message).toBe('Bad request');
    expect(error.name).toBe('BadRequestError');
  });

  test('InvalidApiKeyError has correct properties', () => {
    const error = new errors.InvalidApiKeyError('Invalid API key');
    expect(error.message).toBe('Invalid API key');
    expect(error.name).toBe('InvalidApiKeyError');
  });

  test('InsufficientPermissionsError has correct properties', () => {
    const error = new errors.InsufficientPermissionsError('Insufficient permissions');
    expect(error.message).toBe('Insufficient permissions');
    expect(error.name).toBe('InsufficientPermissionsError');
  });

  test('ResourceNotFoundError has correct properties', () => {
    const error = new errors.ResourceNotFoundError('Resource not found');
    expect(error.message).toBe('Resource not found');
    expect(error.name).toBe('ResourceNotFoundError');
  });

  test('DuplicateEmailError has correct properties', () => {
    const error = new errors.DuplicateEmailError('Duplicate email');
    expect(error.message).toBe('Duplicate email');
    expect(error.name).toBe('DuplicateEmailError');
  });

  test('GeneralError has correct properties', () => {
    const error = new errors.GeneralError('General error');
    expect(error.message).toBe('General error');
    expect(error.name).toBe('GeneralError');
  });

  // Add more tests for other error types as needed
});