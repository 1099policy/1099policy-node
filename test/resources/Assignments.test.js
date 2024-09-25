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
    const mockResponse = {
      data: [
        {
          "id": "as_01HF3JTGBHVJT9QWVQKJT9QW1Q",
          "object": "assignment",
          "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
          "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
          "status": "active",
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
      ]
    };
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
    const mockResponse = {
      data: {
        "id": "as_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "assignment",
        "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
        "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
        "status": "active",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const assignmentData = {
      "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
      "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q"
    };
    const result = await assignments.create(assignmentData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/assignments',
      assignmentData,
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
        "id": "as_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "assignment",
        "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
        "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
        "status": "inactive",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-02T00:00:00Z"
      }
    };
    axios.put.mockResolvedValue(mockResponse);

    const updateData = { status: 'inactive' };
    const result = await assignments.update('as_01HF3JTGBHVJT9QWVQKJT9QW1Q', updateData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.put).toHaveBeenCalledWith(
      '/assignments/as_01HF3JTGBHVJT9QWVQKJT9QW1Q',
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
        "id": "as_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "assignment",
        "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
        "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
        "status": "active",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await assignments.retrieve('as_01HF3JTGBHVJT9QWVQKJT9QW1Q');

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/assignments/as_01HF3JTGBHVJT9QWVQKJT9QW1Q',
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
        "id": "as_01HF3JTGBHVJT9QWVQKJT9QW1Q",
        "object": "assignment",
        "deleted": true
      }
    };
    axios.delete.mockResolvedValue(mockResponse);

    const result = await assignments.del('as_01HF3JTGBHVJT9QWVQKJT9QW1Q');

    expect(result).toEqual(mockResponse.data);
    expect(axios.delete).toHaveBeenCalledWith(
      '/assignments/as_01HF3JTGBHVJT9QWVQKJT9QW1Q',
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