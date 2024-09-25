const Webhooks = require('../../lib/resources/Webhooks');
const axios = require('axios');

jest.mock('axios');

describe('Webhooks', () => {
  let webhooks;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    webhooks = new Webhooks('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: false,
    });
  });

  test('list method sends correct request', async () => {
    const mockResponse = {
      data: [
        {
          "id": "we_01HF3JTGBHVJT9QWVQKJT9QW1Q",
          "object": "webhook_endpoint",
          "url": "https://example.com/webhook",
          "status": "enabled",
          "events": ["policy.created", "policy.updated"],
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
      ]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await webhooks.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/webhook_endpoints',
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
        "id": "we_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "webhook_endpoint",
        "url": "https://example.com/webhook",
        "status": "enabled",
        "events": ["policy.created", "policy.updated"],
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const webhookData = {
      url: 'https://example.com/webhook',
      events: ['policy.created', 'policy.updated']
    };
    const result = await webhooks.create(webhookData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/webhook_endpoints',
      webhookData,
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