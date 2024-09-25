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
    const mockResponse = {
      data: [
        {
          "id": "cn_01HF3JTGBHVJT9QWVQKJT9QW1Q",
          "object": "contractor",
          "first_name": "John",
          "last_name": "Doe",
          "email": "john.doe@example.com",
          "phone": "+1234567890",
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        },
        // ... more contractors
      ]
    };
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