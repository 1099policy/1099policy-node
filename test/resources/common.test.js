const Resource = require('../../lib/resources/Resource');

const resourceFiles = [
  'Assignments',
  'Contractors',
  'Entities',
  'Invoices',
  'JobCategories',
  'Jobs',
  'Policies',
  'Quotes',
  'Webhooks'
];

resourceFiles.forEach(resourceName => {
  const ResourceClass = require(`../../lib/resources/${resourceName}`);

  describe(`${resourceName} Resource`, () => {
    let resource;

    beforeEach(() => {
      resource = new ResourceClass('apiKey', 'baseURL', {});
    });

    test('is instantiable', () => {
      expect(resource).toBeInstanceOf(ResourceClass);
      expect(resource).toBeInstanceOf(Resource);
    });

    test('has correct path', () => {
      expect(resource.path).toBe(`/${resourceName.toLowerCase()}`);
    });

    // Add more specific tests for each resource if needed
  });
});