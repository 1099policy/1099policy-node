const resourceNamespace = require('../lib/ResourceNamespace');

describe('ResourceNamespace', () => {
  test('creates a namespace with given resources', () => {
    const mockResource = { method: jest.fn() };
    const namespace = resourceNamespace('test', { resource: mockResource });
    
    expect(namespace).toBeDefined();
    expect(namespace.resource).toBe(mockResource);
  });
});