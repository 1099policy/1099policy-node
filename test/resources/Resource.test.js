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

  test('update method sends correct request', async () => {
    const mockResponse = { data: { id: 1, name: 'Updated' } };
    axios.put.mockResolvedValue(mockResponse);

    resource.resourcePath = '/test';
    const result = await resource.update(1, { name: 'Updated' });

    expect(result).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith(
      '/test/1',
      { name: 'Updated' },
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
    const mockResponse = { data: { id: 1 } };
    axios.get.mockResolvedValue(mockResponse);

    resource.resourcePath = '/test';
    const result = await resource.retrieve(1);

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/test/1',
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

    resource.resourcePath = '/test';
    const result = await resource.del(1);

    expect(result).toEqual(mockResponse.data);
    expect(axios.delete).toHaveBeenCalledWith(
      '/test/1',
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

  test('logCurlCommand logs correct curl command when enabled', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const resourceWithLogCurl = new Resource('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: true,
    });

    resourceWithLogCurl.logCurlCommand('GET', '/test', { 'Authorization': 'Bearer testApiKey' });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("curl -X GET 'https://api.test.com/test' -H 'Authorization: Bearer testApiKey'")
    );

    consoleSpy.mockRestore();
  });

  test('unpackJsonFields correctly unpacks JSON strings', () => {
    const data = {
      normal: 'value',
      jsonString: '{"key": "value"}',
      nestedArray: '[{"nestedKey": "nestedValue"}]'
    };

    const result = resource.unpackJsonFields(data);

    expect(result).toEqual({
      normal: 'value',
      jsonString: { key: 'value' },
      nestedArray: [{ nestedKey: 'nestedValue' }]
    });
  });
});