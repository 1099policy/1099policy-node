const Assignments = require('../../lib/resources/Assignments');
const axios = require('axios');

jest.mock('axios');

describe('Assignments', () => {
  let assignments;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    assignments = new Assignments('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: false,
    });
  });

  test('list method sends correct request', async () => {
    const mockResponse = { data: [{ id: 1, contractor: 'cn_123', job: 'jb_456' }] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await assignments.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/assignments',
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
    const mockResponse = { data: { id: 1, contractor: 'cn_123', job: 'jb_456' } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await assignments.create({ contractor: 'cn_123', job: 'jb_456' });

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/assignments',
      { contractor: 'cn_123', job: 'jb_456' },
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
    const mockResponse = { data: { id: 1, contractor: 'cn_789', job: 'jb_456' } };
    axios.put.mockResolvedValue(mockResponse);

    const result = await assignments.update('as_123', { contractor: 'cn_789' });

    expect(result).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith(
      '/assignments/as_123',
      { contractor: 'cn_789' },
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
    const mockResponse = { data: { id: 1, contractor: 'cn_123', job: 'jb_456' } };
    axios.get.mockResolvedValue(mockResponse);

    const result = await assignments.retrieve('as_123');

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/assignments/as_123',
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

    const result = await assignments.del('as_123');

    expect(result).toEqual(mockResponse.data);
    expect(axios.delete).toHaveBeenCalledWith(
      '/assignments/as_123',
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