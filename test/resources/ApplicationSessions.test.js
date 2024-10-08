const ApplicationSessions = require('../../lib/resources/ApplicationSessions');
const axios = require('axios');

jest.mock('axios');

describe('ApplicationSessions', () => {
  let applicationSessions;

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
    applicationSessions = new ApplicationSessions('testApiKey', 'https://api.test.com', {
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
          "object": "application_session",
          "status": "active",
          "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
          "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
          "url": "https://apply.1099policy.com/s/abcdefghijklmnop",
          "expires_at": "2023-12-31T23:59:59Z",
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": "2023-01-01T00:00:00Z"
        }
      ]
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await applicationSessions.list();

    expect(result).toEqual(mockResponse.data);
    expect(axios.get).toHaveBeenCalledWith(
      '/apply/sessions',
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
        "object": "application_session",
        "status": "active",
        "contractor": "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
        "job": "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q",
        "url": "https://apply.1099policy.com/s/abcdefghijklmnop",
        "expires_at": "2023-12-31T23:59:59Z",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    };
    axios.post.mockResolvedValue(mockResponse);

    const sessionData = {
      contractor: "cn_01HF3JTGBHVJT9QWVQKJT9QW2Q",
      job: "jb_01HF3JTGBHVJT9QWVQKJT9QW3Q"
    };
    const result = await applicationSessions.create(sessionData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      '/apply/sessions',
      sessionData,
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

  // Add more tests for update, retrieve, and del methods as needed
});