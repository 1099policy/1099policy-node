const Resource = require('../../lib/resources/Resource');
const axios = require('axios');

jest.mock('axios');

describe('Resource', () => {
  let resource;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    resource = new Resource('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: false,
    });
  });

  test('constructor sets properties correctly', () => {
    expect(resource.apiKey).toBe('testApiKey');
    expect(resource.baseURL).toBe('https://api.test.com');
    expect(resource.defaultHeaders['Authorization']).toBe('Bearer testApiKey');
    expect(resource.defaultHeaders['Ten99policy-Environment']).toBe('test');
    expect(resource.defaultHeaders['Ten99Policy-Idempotent-Key']).toBe('testIdempotencyKey');
    expect(resource.logCurl).toBe(false);
  });

  test('list method sends correct request', async () => {
    const mockResponse = { data: [{ id: 1 }] };
    axios.get.mockResolvedValue(mockResponse);

    resource.resourcePath = '/test';
    const result = await resource.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/test',
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
    const mockResponse = { data: { id: 1 } };
    axios.post.mockResolvedValue(mockResponse);

    resource.resourcePath = '/test';
    const result = await resource.create({ name: 'Test' });

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/test',
      { name: 'Test' },
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