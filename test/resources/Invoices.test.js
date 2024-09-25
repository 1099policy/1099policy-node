const Invoices = require('../../lib/resources/Invoices');
const axios = require('axios');

jest.mock('axios');

describe('Invoices', () => {
  let invoices;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    invoices = new Invoices('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: false,
    });
  });

  test('list method sends correct request', async () => {
    const mockResponse = {
      data: [
        {
          "id": "in_01HF3JTGBHVJT9QWVQKJT9QW1Q",
          "object": "invoice",
          "amount": 10000,
          "currency": "usd",
          "due_date": "2023-12-31",
          "status": "open",
          "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
          "policy": "po_01HF3JTGBHVJT9QWVQKJT9QW3Q",
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
      ]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await invoices.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/invoices',
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
        "id": "in_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "invoice",
        "amount": 10000,
        "currency": "usd",
        "due_date": "2023-12-31",
        "status": "open",
        "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
        "policy": "po_01HF3JTGBHVJT9QWVQKJT9QW3Q",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const invoiceData = {
      amount: 10000,
      currency: "usd",
      due_date: "2023-12-31",
      contractor: "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
      policy: "po_01HF3JTGBHVJT9QWVQKJT9QW3Q"
    };
    const result = await invoices.create(invoiceData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/invoices',
      invoiceData,
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

  // Add more tests for update, retrieve, and del methods
});