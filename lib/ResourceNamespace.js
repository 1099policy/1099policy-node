'use strict';

function ResourceNamespace(ten99policy, resources) {
  for (const name in resources) {
    const camelCaseName = name[0].toLowerCase() + name.substring(1);
    const resource = new resources[name](ten99policy);

    this[camelCaseName] = resource;
  }
}

module.exports = function(namespace, resources) {
  return function(ten99policy) {
    return new ResourceNamespace(ten99policy, resources);
  };
};

module.exports.ResourceNamespace = ResourceNamespace;
