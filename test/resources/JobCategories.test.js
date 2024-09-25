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
    const mockResponse = {
      data: [
        {
          "id": "jc_01HF3JTGBHVJT9QWVQKJT9QW1Q",
          "object": "job_category",
          "code": "0001",
          "name": "Accounting",
          "description": "Accounting and financial services",
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        },
        {
          "id": "jc_01HF3JTGBHVJT9QWVQKJT9QW2Q",
          "object": "job_category",
          "code": "0002",
          "name": "IT Services",
          "description": "Information Technology services",
          "created_at": "2023-01-02T00:00:00Z",
          "updated_at": "2023-01-02T00:00:00Z"
        }
      ]
    };
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
    const mockResponse = {
      data: {
        "id": "jc_123456789",
        "object": "job_category",
        "code": "0003",
        "name": "Software Development",
        "description": "Software development and engineering",
        "created_at": "2023-01-03T00:00:00Z",
        "updated_at": "2023-01-03T00:00:00Z"
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const jobCategoryData = {
      "code": "0003",
      "name": "Software Development",
      "description": "Software development and engineering"
    };
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
    const mockResponse = {
      data: {
        "id": "jc_123456789",
        "object": "job_category",
        "code": "0003",
        "name": "Updated Software Development",
        "description": "Updated software development and engineering",
        "created_at": "2023-01-03T00:00:00Z",
        "updated_at": "2023-01-04T00:00:00Z"
      }
    };
    axios.put.mockResolvedValue(mockResponse);

    const updateData = {
      "name": "Updated Software Development",
      "description": "Updated software development and engineering"
    };
    const result = await jobCategories.update('jc_123456789', updateData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith(
      '/category_codes/jc_123456789',
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
        "id": "jc_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "job_category",
        "code": "0001",
        "name": "Accounting",
        "description": "Accounting and financial services",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await jobCategories.retrieve('jc_01HF3JTGBHVJT9QWVQKJT9QW1Q');

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/category_codes/jc_01HF3JTGBHVJT9QWVQKJT9QW1Q',
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
        "id": "jc_123456789",
        "object": "job_category",
        "deleted": true
      }
    };
    axios.delete.mockResolvedValue(mockResponse);

    const result = await jobCategories.del('jc_123456789');

    expect(result).toEqual(mockResponse.data);
    expect(axios.delete).toHaveBeenCalledWith(
      '/category_codes/jc_123456789',
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