'use strict';

/**
 * Namespaces resources by prepending a given namespace to each resource key.
 * @param {string} namespace - The namespace to prepend to each resource key.
 ```
 /**
  * Adds namespace prefix to resource keys
  * @param {Object} resources - The original resources object
  * @param {string} namespace - The namespace to be prepended to each key
  * @param {Object} namespacedResources - The target object to store namespaced resources
  * @returns {void} This function does not return a value
  */
 ```
 * @param {Object} resources - An object containing resources to be namespaced.
 * @returns {Object} A new object with namespaced resource keys.
 */
module.exports = function resourceNamespace(namespace, resources) {
  const namespacedResources = {};

  Object.keys(resources).forEach((key) => {
    namespacedResources[`${namespace}.${key}`] = resources[key];
  });

  return namespacedResources;
};
