'use strict';

const utils = require('./utils');

const DEFAULT_HOST = 'api.1099policy.com';
const DEFAULT_PORT = '443';
const DEFAULT_BASE_PATH = '/api/v1/';
const DEFAULT_API_VERSION = null;
const DEFAULT_TIMEOUT = 80000;
const MAX_NETWORK_RETRY_DELAY_SEC = 2;
const INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
const ALLOWED_CONFIG_PROPERTIES = [
  'key',
  'apiVersion',
  'maxNetworkRetries',
  'timeout',
  'host',
  'port',
  'protocol',
];

const EventEmitter = require('events').EventEmitter;

Ten99Policy.resources = require('./resources');
Ten99Policy.Ten99PolicyResource = require('./Ten99PolicyResource');
Ten99Policy.errors = require('./Error');

function Ten99Policy(config = {}) {
  if (!(this instanceof Ten99Policy)) {
    return new Ten99Policy(config);
  }

  const props = this._getPropsFromConfig(config);

  Object.defineProperty(this, '_emitter', {
    value: new EventEmitter(),
    enumerable: false,
    configurable: false,
    writable: false,
  });

  this.VERSION = '1.0';

  this.on = this._emitter.on.bind(this._emitter);
  this.once = this._emitter.once.bind(this._emitter);
  this.off = this._emitter.removeListener.bind(this._emitter);

  if (
    props.protocol &&
    props.protocol !== 'https' &&
    (!props.host || /\.ten99policy\.com$/.test(props.host))
  ) {
    throw new Error(
      'The `https` protocol must be used when sending requests to `*.ten99policy.com`'
    );
  }

  this._api = {
    auth: null,
    host: props.host || DEFAULT_HOST,
    port: props.port || DEFAULT_PORT,
    protocol: props.protocol || 'https',
    basePath: DEFAULT_BASE_PATH,
    version: props.apiVersion || DEFAULT_API_VERSION,
    timeout: utils.validateInteger('timeout', props.timeout, DEFAULT_TIMEOUT),
    maxNetworkRetries: utils.validateInteger(
      'maxNetworkRetries',
      props.maxNetworkRetries,
      0
    ),
    dev: false,
  };

  // wake up all the resources
  for (const name in Ten99Policy.resources) {
    this[utils.pascalToCamelCase(name)] = new Ten99Policy.resources[name](this);
  }

  // set bearer token
  this._setApiKey(config.key);

  this.errors = require('./Error');
  this.Ten99PolicyResource = Ten99Policy.Ten99PolicyResource;
}

Ten99Policy.prototype = {
  _setApiKey(key) {
    if (key) {
      this._setApiField('auth', `Bearer ${key}`);
    }
  },

  _setApiField(key, value) {
    this._api[key] = value;
  },

  getApiField(key) {
    return this._api[key];
  },

  getConstant: (c) => {
    switch (c) {
      case 'DEFAULT_HOST':
        return DEFAULT_HOST;
      case 'DEFAULT_PORT':
        return DEFAULT_PORT;
      case 'DEFAULT_BASE_PATH':
        return DEFAULT_BASE_PATH;
      case 'DEFAULT_API_VERSION':
        return DEFAULT_API_VERSION;
      case 'DEFAULT_TIMEOUT':
        return DEFAULT_TIMEOUT;
      case 'MAX_NETWORK_RETRY_DELAY_SEC':
        return MAX_NETWORK_RETRY_DELAY_SEC;
      case 'INITIAL_NETWORK_RETRY_DELAY_SEC':
        return INITIAL_NETWORK_RETRY_DELAY_SEC;
    }
    return Ten99Policy[c];
  },

  getMaxNetworkRetries() {
    return this.getApiField('maxNetworkRetries');
  },

  getMaxNetworkRetryDelay() {
    return MAX_NETWORK_RETRY_DELAY_SEC;
  },

  getInitialNetworkRetryDelay() {
    return INITIAL_NETWORK_RETRY_DELAY_SEC;
  },

  getClientUserAgent(cb) {
    if (Ten99Policy.USER_AGENT_SERIALIZED) {
      return cb(Ten99Policy.USER_AGENT_SERIALIZED);
    }

    this.getClientUserAgentSeeded(Ten99Policy.USER_AGENT, (cua) => {
      Ten99Policy.USER_AGENT_SERIALIZED = cua;
      cb(Ten99Policy.USER_AGENT_SERIALIZED);
    });
  },

  getClientUserAgentSeeded(seed, cb) {
    utils.safeExec('uname -a', (err, uname) => {
      const userAgent = {};
      for (const field in seed) {
        userAgent[field] = encodeURIComponent(seed[field]);
      }

      // URI-encode in case there are unusual characters in the system's uname.
      userAgent.uname = encodeURIComponent(uname || 'UNKNOWN');

      cb(JSON.stringify(userAgent));
    });
  },

  _getPropsFromConfig(config) {
    if (!config) {
      return {};
    }

    // config can only be an object
    if (typeof config !== 'object' || (!config === Object(config) && !Array.isArray(config))) {
      throw new Error('Config must be an object');
    }

    const values = Object.keys(config).filter(
      (value) => !ALLOWED_CONFIG_PROPERTIES.includes(value)
    );

    if (values.length > 0) {
      throw new Error(
        `Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(
          ', '
        )}`
      );
    }

    return config;
  },
};

module.exports = Ten99Policy;
