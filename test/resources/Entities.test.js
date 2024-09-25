const Entities = require('../../lib/resources/Entities');
const axios = require('axios');

jest.mock('axios');

describe('Entities', () => {
  let entities;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    entities = new Entities('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: false,
    });
  });

  test('list method sends correct request', async () => {
    const mockResponse = {
      data: [
        {
          "id": "en_01HF3JTGBHVJT9QWVQKJT9QW1Q",
          "object": "entity",
          "name": "Acme Inc.",
          "type": "corporation",
          "tax_id": "123456789",
          "address": {
            "line1": "123 Main St",
            "city": "San Francisco",
            "state": "CA",
            "postal_code": "94105",
            "country": "US"
          },
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
      ]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await entities.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/entities',
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
        "id": "en_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "entity",
        "name": "Acme Inc.",
        "type": "corporation",
        "tax_id": "123456789",
        "address": {
          "line1": "123 Main St",
          "city": "San Francisco",
          "state": "CA",
          "postal_code": "94105",
          "country": "US"
        },
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const entityData = {
      name: "Acme Inc.",
      type: "corporation",
      tax_id: "123456789",
      address: {
        line1: "123 Main St",
        city: "San Francisco",
        state: "CA",
        postal_code: "94105",
        country: "US"
      }
    };
    const result = await entities.create(entityData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/entities',
      entityData,
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
    const mockResponse = { data: { id: 1, name: 'Updated Entity' } };
    axios.put.mockResolvedValue(mockResponse);

    const result = await entities.update('en_123', { name: 'Updated Entity' });

    expect(result).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith(
      '/entities/en_123',
      { name: 'Updated Entity' },
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
    const mockResponse = { data: { id: 1, name: 'Test Entity' } };
    axios.get.mockResolvedValue(mockResponse);

    const result = await entities.retrieve('en_123');

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/entities/en_123',
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
    const mockResponse = { data: { id: 1, deleted: true } };
    axios.delete.mockResolvedValue(mockResponse);

    const result = await entities.del('en_123');

    expect(result).toEqual(mockResponse.data);
    expect(axios.delete).toHaveBeenCalledWith(
      '/entities/en_123',
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