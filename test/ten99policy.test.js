const Ten99Policy = require('../lib/ten99policy');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path');

// Mock all resource files
const mockResourceFiles = [
  'ApplicationSessions.js',
  'Assignments.js',
  'Contractors.js',
  'Entities.js',
  'Invoices.js',
  'JobCategories.js',
  'Jobs.js',
  'Policies.js',
  'Quotes.js',
  'Resource.js',
  'Webhooks.js'
];

mockResourceFiles.forEach(file => {
  jest.mock(`../lib/resources/${file}`, () => {
    return jest.fn().mockImplementation(() => ({
      someMethod: jest.fn()
    }));
  }, { virtual: true });
});

describe('Ten99Policy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fs.readdirSync.mockReturnValue(mockResourceFiles);
    fs.lstatSync.mockReturnValue({ isFile: () => true });
    path.join.mockImplementation((...args) => args.join('/'));
    path.basename.mockImplementation((file, ext) => file.replace(ext, ''));
  });

  test('constructor initializes with default options', () => {
    const ten99policy = new Ten99Policy();
    expect(ten99policy.apiKey).toBe('');
    expect(ten99policy.host).toBe('api.1099policy.com');
    expect(ten99policy.port).toBe('443');
    expect(ten99policy.protocol).toBe('https');
    expect(ten99policy.environment).toBe('production');
    expect(ten99policy.idempotencyKey).toBeNull();
    expect(ten99policy.logCurl).toBe(false);
  });

  test('constructor initializes with custom options', () => {
    const options = {
      key: 'customApiKey',
      host: 'custom.host.com',
      port: '8080',
      protocol: 'http',
      environment: 'staging',
      idempotencyKey: 'customKey',
      logCurl: true,
    };
    const ten99policy = new Ten99Policy(options);
    expect(ten99policy.apiKey).toBe('customApiKey');
    expect(ten99policy.host).toBe('custom.host.com');
    expect(ten99policy.port).toBe('8080');
    expect(ten99policy.protocol).toBe('http');
    expect(ten99policy.environment).toBe('staging');
    expect(ten99policy.idempotencyKey).toBe('customKey');
    expect(ten99policy.logCurl).toBe(true);
  });

  test('loadResources loads and initializes resources', () => {
    const ten99policy = new Ten99Policy();
    mockResourceFiles.forEach(file => {
      const resourceName = path.basename(file, '.js');
      const instanceName = resourceName.charAt(0).toLowerCase() + resourceName.slice(1);
      expect(ten99policy[instanceName]).toBeDefined();
    });
  });

  test('loadResources skips non-JavaScript files', () => {
    fs.readdirSync.mockReturnValue([...mockResourceFiles, 'somefile.txt']);
    const ten99policy = new Ten99Policy();
    expect(ten99policy.somefile).toBeUndefined();
  });

  test('loadResources skips directories', () => {
    fs.readdirSync.mockReturnValue([...mockResourceFiles, 'directory']);
    fs.lstatSync.mockImplementation((file) => ({
      isFile: () => !file.includes('directory')
    }));
    const ten99policy = new Ten99Policy();
    expect(ten99policy.directory).toBeUndefined();
  });
});