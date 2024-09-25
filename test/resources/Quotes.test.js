const Quotes = require('../../lib/resources/Quotes');
const axios = require('axios');

jest.mock('axios');

describe('Quotes', () => {
  let quotes;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    quotes = new Quotes('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: false,
    });
  });

  test('list method sends correct request', async () => {
    const mockResponse = {
      data: [
        {
          "id": "qt_01HF3JTGBHVJT9QWVQKJT9QW1Q",
          "object": "quote",
          "status": "pending",
          "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
          "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
          "effective_date": "2023-01-01",
          "end_date": "2023-12-31",
          "premium": 1000,
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
      ]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await quotes.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/quotes',
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

  test('create method sends correct request', async () => {
    const mockResponse = {
      data: {
        "id": "qt_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "quote",
        "status": "pending",
        "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
        "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
        "effective_date": "2023-01-01",
        "end_date": "2023-12-31",
        "premium": 1000,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const quoteData = {
      contractor: "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
      job: "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
      effective_date: "2023-01-01",
      end_date: "2023-12-31"
    };
    const result = await quotes.create(quoteData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/quotes',
      quoteData,
      expect.objectContaining({
        baseURL: 'https://api.test.com',
        headers: expect.objectContaining({
          'Authorization': 'Bearer testApiKey',
          'Ten99policy-Environment': 'test',
          'Ten99Policy-Idempotent-Key': 'testIdempotencyKey',
          'Content-Type': 'application/json'
        })
      })
    );
  });

  // Add more tests for update and retrieve methods
});