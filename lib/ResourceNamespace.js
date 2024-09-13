'use strict';

module.exports = function resourceNamespace(namespace, resources) {
  const namespacedResources = {};

  Object.keys(resources).forEach((key) => {
    namespacedResources[`${namespace}.${key}`] = resources[key];
  });

  return namespacedResources;
};
