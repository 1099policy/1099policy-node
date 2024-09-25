'use strict';

const axios = require('axios');

class Resource {
  constructor(apiKey, baseURL, options) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.options = options;
    this.path = ''; // Add this line
  }

  async _request(method, path, data = null) {
    const url = `${this.baseURL}${path}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios({
        method,
        url,
        data,
        headers
      });
      return this.unpackJsonFields(response.data);
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async list(params = {}) {
    return this._request('GET', this.path, { params });
  }

  async retrieve(id) {
    return this._request('GET', `${this.path}/${id}`);
  }

  async create(data) {
    return this._request('POST', this.path, data);
  }

  async update(id, data) {
    return this._request('PUT', `${this.path}/${id}`, data);
  }

  async delete(id) {
    return this._request('DELETE', `${this.path}/${id}`);
  }

  unpackJsonFields(data) {
    // Implement JSON field unpacking logic here
    return data;
  }

  handleApiError(error) {
    // Implement error handling logic here
    throw error;
  }
}

module.exports = Resource;
