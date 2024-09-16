'use strict';

const axios = require('axios');
const { decideApiError } = require('../errorHandler');

class Resource {
  constructor(apiKey, baseURL, options = {}) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.logCurl = options.logCurl || false;
    this.defaultHeaders = this.initializeHeaders(options);
  }

  initializeHeaders(options) {
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
    };

    if (options.environment) {
      headers['Ten99policy-Environment'] = options.environment;
    }

    if (options.idempotencyKey) {
      headers['Ten99Policy-Idempotent-Key'] = options.idempotencyKey;
    }

    return headers;
  }

  mergeHeaders(requestHeaders = {}) {
    return { ...this.defaultHeaders, ...requestHeaders };
  }

  logCurlCommand(method, url, headers, data = null) {
    if (!this.logCurl) return;

    let curl = `curl -X ${method.toUpperCase()} '${this.baseURL}${url}'`;
    Object.entries(headers).forEach(([key, value]) => {
      curl += ` -H '${key}: ${value}'`;
    });

    if (data) {
      curl += ` -d '${JSON.stringify(data)}'`;
    }

    console.log(curl);
  }

  handleApiError(error) {
    if (error.response) {
      const { data, status, headers, config } = error.response;
      throw decideApiError(data, config.data, status, error.response, headers);
    } else {
      throw new errors.Ten99PolicyError('Unknown error occurred');
    }
  }

  // Automatically unpack fields that look like JSON strings
  unpackJsonFields(data) {
    if (Array.isArray(data)) {
      return data.map(item => this.unpackJsonFields(item));
    } else if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        const value = data[key];
        // Check if the value looks like a JSON string
        if (typeof value === 'string' && this.looksLikeJson(value)) {
          try {
            // Replace single quotes with double quotes and parse the JSON
            const correctedJson = value.replace(/'/g, '"');
            data[key] = JSON.parse(correctedJson);
          } catch (e) {
            console.warn(`Failed to parse JSON field: ${key}`, e);
          }
        }
      });
    }

    return data;
  }

  // Helper method to check if a string looks like JSON
  looksLikeJson(str) {
    return (str.startsWith('{') && str.endsWith('}')) || (str.startsWith('[') && str.endsWith(']'));
  }

  list(params, requestHeaders = {}) {
    const url = this.resourcePath;
    const headers = this.mergeHeaders(requestHeaders);

    this.logCurlCommand('get', url, headers);

    return axios
      .get(url, { baseURL: this.baseURL, params, headers })
      .then(response => this.unpackJsonFields(response.data)) // Unpack JSON fields
      .catch(error => this.handleApiError(error));
  }

  create(data, requestHeaders = {}) {
    const url = this.resourcePath;
    const headers = this.mergeHeaders({ 'Content-Type': 'application/json', ...requestHeaders });

    this.logCurlCommand('post', url, headers, data);

    return axios
      .post(url, data, { baseURL: this.baseURL, headers })
      .then(response => this.unpackJsonFields(response.data)) // Unpack JSON fields
      .catch(error => this.handleApiError(error));
  }

  update(id, data, requestHeaders = {}) {
    const url = `${this.resourcePath}/${id}`;
    const headers = this.mergeHeaders({ 'Content-Type': 'application/json', ...requestHeaders });

    this.logCurlCommand('put', url, headers, data);

    return axios
      .put(url, data, { baseURL: this.baseURL, headers })
      .then(response => this.unpackJsonFields(response.data)) // Unpack JSON fields
      .catch(error => this.handleApiError(error));
  }

  retrieve(id, requestHeaders = {}) {
    const url = `${this.resourcePath}/${id}`;
    const headers = this.mergeHeaders(requestHeaders);

    this.logCurlCommand('get', url, headers);

    return axios
      .get(url, { baseURL: this.baseURL, headers })
      .then(response => this.unpackJsonFields(response.data)) // Unpack JSON fields
      .catch(error => this.handleApiError(error));
  }

  del(id, requestHeaders = {}) {
    const url = `${this.resourcePath}/${id}`;
    const headers = this.mergeHeaders(requestHeaders);

    this.logCurlCommand('delete', url, headers);

    return axios
      .delete(url, { baseURL: this.baseURL, headers })
      .then(response => this.unpackJsonFields(response.data)) // Unpack JSON fields
      .catch(error => this.handleApiError(error));
  }
}

module.exports = Resource;
