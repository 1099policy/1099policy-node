'use strict';

const fs = require('fs');
const path = require('path');

// Helper function to load all resources dynamically
function loadResources(apiKey, baseURL, options) {
  const resources = {};
  const resourcesDir = path.join(__dirname, 'resources');

  // Read all files in the resources directory
  fs.readdirSync(resourcesDir).forEach((file) => {
    const filePath = path.join(resourcesDir, file);

    // Check if the file is a JavaScript file and not a directory
    if (fs.lstatSync(filePath).isFile() && file.endsWith('.js')) {
      const ResourceClass = require(filePath);

      // Remove the file extension and make the resource name camelCase
      const resourceName = path.basename(file, '.js');
      const resourceInstanceName = resourceName.charAt(0).toLowerCase() + resourceName.slice(1);

      // Initialize the resource and add it to the resources object
      resources[resourceInstanceName] = new ResourceClass(apiKey, baseURL, options);
    }
  });

  return resources;
}

class Ten99Policy {
  constructor(options = {}) {
    this.apiKey = options.key || '';
    this.host = options.host || '127.0.0.1';
    this.port = options.port || '5000';
    this.protocol = options.protocol || 'http';
    this.environment = options.environment || 'production';
    this.idempotencyKey = options.idempotencyKey || null;
    this.logCurl = options.logCurl || false; // Add logCurl option

    const baseURL = `${this.protocol}://${this.host}:${this.port}/api/v1`;

    // Dynamically load all resources with the options
    const loadedResources = loadResources(this.apiKey, baseURL, {
      environment: this.environment,
      idempotencyKey: this.idempotencyKey,
      logCurl: this.logCurl, // Pass logCurl option to resources
    });

    // Assign loaded resources to this instance
    Object.assign(this, loadedResources);

    // Initialize namespaces (if any) using resourceNamespace
    const resourceNamespace = require('./ResourceNamespace');
    this.apply = resourceNamespace('apply', {
      sessions: new (require('./resources/Apply/Sessions'))(this.apiKey, baseURL, {
        environment: this.environment,
        idempotencyKey: this.idempotencyKey,
        logCurl: this.logCurl, // Pass logCurl option to namespaces as well
      }),
    });
  }
}

module.exports = Ten99Policy;
