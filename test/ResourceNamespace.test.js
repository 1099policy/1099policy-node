const ResourceNamespace = require('../lib/ResourceNamespace');

describe('ResourceNamespace', () => {
  test('creates a namespace with resources', () => {
    const mockResource1 = jest.fn();
    const mockResource2 = jest.fn();
    const resources = {
      resource1: mockResource1,
      resource2: mockResource2
    };

    const namespace = ResourceNamespace('testNamespace', resources);

    expect(namespace['testNamespace.resource1']).toBe(mockResource1);
    expect(namespace['testNamespace.resource2']).toBe(mockResource2);
    expect(Object.keys(namespace).length).toBe(2);
  });

  test('returns an empty object when no resources are provided', () => {
    const namespace = ResourceNamespace('testNamespace', {});

    expect(Object.keys(namespace).length).toBe(0);
  });

  test('prefixes resource keys with namespace', () => {
    const resources = {
      resource1: jest.fn(),
      resource2: jest.fn()
    };

    const namespace = ResourceNamespace('test', resources);

    expect(Object.keys(namespace)).toEqual(['test.resource1', 'test.resource2']);
  });
});