const JobCategories = require('../../lib/resources/JobCategories');
const axios = require('axios');

jest.mock('axios');

describe('JobCategories', () => {
  let jobCategories;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    jobCategories = new JobCategories('testApiKey', 'https://api.test.com', {
      environment: 'test',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: false,
    });
  });

  test('constructor sets resourcePath correctly', () => {
    expect(jobCategories.resourcePath).toBe('/category_codes');
  });

  test('list method sends correct request', async () => {
    const mockResponse = { data: [{ id: 'jc_1', name: 'Software Development' }] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await jobCategories.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/category_codes',
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
    const mockResponse = { data: { id: 'jc_1', name: 'Software Development' } };
    axios.post.mockResolvedValue(mockResponse);

    const jobCategoryData = { name: 'Software Development', description: 'Category for software development jobs' };
    const result = await jobCategories.create(jobCategoryData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/category_codes',
      jobCategoryData,
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
    const mockResponse = { data: { id: 'jc_1', name: 'Updated Software Development' } };
    axios.put.mockResolvedValue(mockResponse);

    const updateData = { name: 'Updated Software Development' };
    const result = await jobCategories.update('jc_1', updateData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith(
      '/category_codes/jc_1',
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
    const mockResponse = { data: { id: 'jc_1', name: 'Software Development' } };
    axios.get.mockResolvedValue(mockResponse);

    const result = await jobCategories.retrieve('jc_1');

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/category_codes/jc_1',
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
    const mockResponse = { data: { id: 'jc_1', deleted: true } };
    axios.delete.mockResolvedValue(mockResponse);

    const result = await jobCategories.del('jc_1');

    expect(result).toEqual(mockResponse.data);
    expect(axios.delete).toHaveBeenCalledWith(
      '/category_codes/jc_1',
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