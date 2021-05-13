'use strict';

function ResourceNamespace(stripe, resources) {
  for (const name in resources) {
    const camelCaseName = name[0].toLowerCase() + name.substring(1);
    const resource = new resources[name](stripe);

    this[camelCaseName] = resource;
  }
}

module.exports = function(namespace, resources) {
  return function(stripe) {
    return new ResourceNamespace(stripe, resources);
  };
};

module.exports.ResourceNamespace = ResourceNamespace;
