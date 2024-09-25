const { handleError } = require('../lib/errorHandler');
const { Ten99PolicyError, APIError } = require('../lib/errors');

describe('errorHandler', () => {
  test('handles API errors', () => {
    const mockError = {
      response: {
        data: { error: 'Test error' },
        status: 400
      }
    };
    expect(() => handleError(mockError)).toThrow(APIError);
    expect(() => handleError(mockError)).toThrow('Test error');
  });

  test('handles network errors', () => {
    const mockError = new Error('Network error');
    expect(() => handleError(mockError)).toThrow(Ten99PolicyError);
    expect(() => handleError(mockError)).toThrow('Network error');
  });
});