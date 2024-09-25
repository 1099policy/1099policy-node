const { decideApiError } = require('../lib/errorHandler');
const errors = require('../lib/errors');

describe('errorHandler', () => {
  let originalConsoleWarn;

  beforeAll(() => {
    // Save the original console.warn
    originalConsoleWarn = console.warn;
    // Mock console.warn to suppress warnings
    console.warn = jest.fn();
  });

  afterAll(() => {
    // Restore the original console.warn after all tests
    console.warn = originalConsoleWarn;
  });

  test('decideApiError returns correct error for status 400', () => {
    const error = decideApiError({ message: 'Bad Request', error_code: 'bad_request' }, null, 400);
    expect(error).toBeInstanceOf(errors.BadRequestError);
    expect(error.message).toBe('Bad Request');
  });

  test('decideApiError returns correct error for status 401', () => {
    const error = decideApiError({ message: 'Unauthorized', error_code: 'invalid_api_key' }, null, 401);
    expect(error).toBeInstanceOf(errors.InvalidApiKeyError);
    expect(error.message).toBe('Unauthorized');
  });

  test('decideApiError returns correct error for status 403', () => {
    const error = decideApiError({ message: 'Forbidden', error_code: 'insufficient_permissions' }, null, 403);
    expect(error).toBeInstanceOf(errors.InsufficientPermissionsError);
    expect(error.message).toBe('Forbidden');
  });

  test('decideApiError returns correct error for status 404', () => {
    const error = decideApiError({ message: 'Not Found', error_code: 'resource_not_found' }, null, 404);
    expect(error).toBeInstanceOf(errors.ResourceNotFoundError);
    expect(error.message).toBe('Not Found');
  });

  test('decideApiError returns correct error for status 409', () => {
    const error = decideApiError({ message: 'Conflict', error_code: 'duplicate_email' }, null, 409);
    expect(error).toBeInstanceOf(errors.DuplicateEmailError);
    expect(error.message).toBe('Conflict');
  });

  test('decideApiError returns Ten99PolicyError for general_error', () => {
    const error = decideApiError({ message: 'Internal Server Error', error_code: 'general_error' }, null, 500);
    expect(error).toBeInstanceOf(errors.Ten99PolicyError);
    expect(error.message).toBe('Internal Server Error');
  });

  test('decideApiError returns Ten99PolicyError for unknown error_code', () => {
    const error = decideApiError({ message: 'Unknown Error', error_code: 'unknown_error' }, null, 999);
    expect(error).toBeInstanceOf(errors.Ten99PolicyError);
    expect(error.message).toBe('Unknown Error');
  });

  test('decideApiError returns Ten99PolicyError when no error_code is provided', () => {
    const error = decideApiError({ message: 'No Error Code' }, null, 400);
    expect(error).toBeInstanceOf(errors.Ten99PolicyError);
    expect(error.message).toBe('No Error Code');
    expect(console.warn).toHaveBeenCalledWith(
      'Warning: No valid error_code provided in the API response. Defaulting to Ten99PolicyError.'
    );
  });

  test('decideApiError returns Ten99PolicyError for unknown error codes', () => {
    const error = decideApiError({ message: 'Unknown Error', error_code: 'unknown_error_code' }, null, 500);
    expect(error).toBeInstanceOf(errors.Ten99PolicyError);
    expect(error.message).toBe('Unknown Error');
  });
});