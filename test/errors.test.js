const errors = require('../lib/errors');

describe('errors', () => {
  test('Ten99PolicyError is defined', () => {
    expect(errors.Ten99PolicyError).toBeDefined();
  });

  test('APIError is defined', () => {
    expect(errors.APIError).toBeDefined();
  });

  test('Ten99PolicyError extends Error', () => {
    const error = new errors.Ten99PolicyError('Test error');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Test error');
  });

  test('APIError extends Ten99PolicyError', () => {
    const error = new errors.APIError('Test API error', 400);
    expect(error).toBeInstanceOf(errors.Ten99PolicyError);
    expect(error.message).toBe('Test API error');
    expect(error.statusCode).toBe(400);
  });
});