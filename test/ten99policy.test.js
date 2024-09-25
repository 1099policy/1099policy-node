const Ten99Policy = require('../lib/ten99policy');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path');

describe('Ten99Policy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the fs.readdirSync to return specific resource files
    fs.readdirSync.mockReturnValue(['ApplicationSessions.js', 'Assignments.js', 'notAResource.txt']);
    fs.lstatSync.mockReturnValue({ isFile: () => true });
    path.join.mockImplementation((...args) => args.join('/'));
    path.basename.mockImplementation((file, ext) => file.replace(ext, ''));
  });

  test('constructor sets default values', () => {
    const ten99policy = new Ten99Policy();
    expect(ten99policy.apiKey).toBe('');
    expect(ten99policy.host).toBe('api.1099policy.com');
    expect(ten99policy.port).toBe('443');
    expect(ten99policy.protocol).toBe('https');
    expect(ten99policy.environment).toBe('production');
    expect(ten99policy.idempotencyKey).toBeNull();
    expect(ten99policy.logCurl).toBe(false);
  });

  test('constructor sets custom values', () => {
    const options = {
      key: 'testKey',
      host: 'test.com',
      port: '8080',
      protocol: 'http',
      environment: 'staging',
      idempotencyKey: 'testIdempotencyKey',
      logCurl: true,
    };
    const ten99policy = new Ten99Policy(options);
    expect(ten99policy.apiKey).toBe('testKey');
    expect(ten99policy.host).toBe('test.com');
    expect(ten99policy.port).toBe('8080');
    expect(ten99policy.protocol).toBe('http');
    expect(ten99policy.environment).toBe('staging');
    expect(ten99policy.idempotencyKey).toBe('testIdempotencyKey');
    expect(ten99policy.logCurl).toBe(true);
  });

  test('loadResources loads resources correctly', () => {
    const mockApplicationSessions = jest.fn();
    const mockAssignments = jest.fn();
    
    // Mock the resource modules
    jest.mock('../lib/resources/ApplicationSessions.js', () => mockApplicationSessions);
    jest.mock('../lib/resources/Assignments.js', () => mockAssignments);

    const ten99policy = new Ten99Policy();

    expect(ten99policy.applicationSessions).toBeDefined();
    expect(ten99policy.assignments).toBeDefined();
    expect(ten99policy.notAResource).toBeUndefined();
  });
});