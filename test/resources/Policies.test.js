const Policies = require('../../lib/resources/Policies');
const axios = require('axios');

jest.mock('axios');

describe('Policies', () => {
  let policies;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    policies = new Policies('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: false,
    });
  });

  test('list method sends correct request', async () => {
    const mockResponse = {
      data: [
        {
          "id": "po_01HF3JTGBHVJT9QWVQKJT9QW1Q",
          "object": "policy",
          "status": "active",
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

    const result = await policies.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/policies',
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
        "id": "po_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "policy",
        "status": "active",
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

    const policyData = {
      contractor: "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
      job: "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
      effective_date: "2023-01-01",
      end_date: "2023-12-31"
    };
    const result = await policies.create(policyData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/policies',
      policyData,
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

  test('update method sends correct request', async () => {
    const mockResponse = {
      data: {
        "id": "po_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "policy",
        "status": "active",
        "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
        "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
        "effective_date": "2023-01-01",
        "end_date": "2023-12-31",
        "premium": 1200,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-02T00:00:00Z"
      }
    };
    axios.put.mockResolvedValue(mockResponse);

    const updateData = { premium: 1200 };
    const result = await policies.update('po_01HF3JTGBHVJT9QWVQKJT9QW1Q', updateData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith(
      '/policies/po_01HF3JTGBHVJT9QWVQKJT9QW1Q',
      updateData,
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

  test('retrieve method sends correct request', async () => {
    const mockResponse = {
      data: {
        "id": "po_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "policy",
        "status": "active",
        "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
        "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
        "effective_date": "2023-01-01",
        "end_date": "2023-12-31",
        "premium": 1000,
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await policies.retrieve('po_01HF3JTGBHVJT9QWVQKJT9QW1Q');

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/policies/po_01HF3JTGBHVJT9QWVQKJT9QW1Q',
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

  test('del method sends correct request', async () => {
    const mockResponse = {
      data: {
        "id": "po_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "policy",
        "deleted": true
      }
    };
    axios.delete.mockResolvedValue(mockResponse);

    const result = await policies.del('po_01HF3JTGBHVJT9QWVQKJT9QW1Q');

    expect(result).toEqual(mockResponse.data);
    expect(axios.delete).toHaveBeenCalledWith(
      '/policies/po_01HF3JTGBHVJT9QWVQKJT9QW1Q',
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
});