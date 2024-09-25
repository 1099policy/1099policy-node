const Resource = require('../../lib/resources/Resource');
const axios = require('axios');

jest.mock('axios');

describe('Resource', () => {
  let resource;

  beforeEach(() => {
    resource = new Resource('apiKey', 'https://api.example.com', {});
    resource.path = '/test';
  });

  test('is instantiable', () => {
    expect(resource).toBeInstanceOf(Resource);
  });

  test('_request sends correct headers', async () => {
    axios.mockResolvedValue({ data: {} });
    await resource._request('GET', '/test');
    expect(axios).toHaveBeenCalledWith(expect.objectContaining({
      headers: expect.objectContaining({
        'Authorization': 'Bearer apiKey',
        'Content-Type': 'application/json'
      })
    }));
  });

  test('list method calls _request with correct parameters', async () => {
    resource._request = jest.fn().mockResolvedValue({});
    await resource.list();
    expect(resource._request).toHaveBeenCalledWith('GET', '/test', { params: {} });
  });

  test('retrieve method calls _request with correct parameters', async () => {
    resource._request = jest.fn().mockResolvedValue({});
    await resource.retrieve('123');
    expect(resource._request).toHaveBeenCalledWith('GET', '/test/123');
  });

  test('create method calls _request with correct parameters', async () => {
    resource._request = jest.fn().mockResolvedValue({});
    const data = { name: 'Test' };
    await resource.create(data);
    expect(resource._request).toHaveBeenCalledWith('POST', '/test', data);
  });

  test('update method calls _request with correct parameters', async () => {
    resource._request = jest.fn().mockResolvedValue({});
    const data = { name: 'Updated Test' };
    await resource.update('123', data);
    expect(resource._request).toHaveBeenCalledWith('PUT', '/test/123', data);
  });

  test('delete method calls _request with correct parameters', async () => {
    resource._request = jest.fn().mockResolvedValue({});
    await resource.delete('123');
    expect(resource._request).toHaveBeenCalledWith('DELETE', '/test/123');
  });
});