const Contractors = require('../../lib/resources/Contractors');
const axios = require('axios');

jest.mock('axios');

describe('Contractors', () => {
  let contractors;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    contractors = new Contractors('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: false,
    });
  });

  test('list method sends correct request', async () => {
    const mockResponse = { data: [{ id: 1 }] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await contractors.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/contractors',
      expect.objectContaining({
        baseURL: 'https://api.test.com',
        headers: expect.objectContaining({
          'Authorization': 'Bearer testApiKey',
          'Ten99policy-Environment': 'test',
          'Ten99Policy-Idempotent-Key': 'testIdempotencyKey'
        })
      })
    );
  });

  // Add more tests for create, update, retrieve, and del methods
});