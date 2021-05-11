/* eslint-disable func-name-matching */

'use strict';

const http = require('http');
const https = require('https');
const path = require('path');
const utils = require('./utils');
const makeRequest = require('./makeRequest');

const {
  Ten99PolicyConnectionError,
  Ten99PolicyAuthenticationError,
  Ten99PolicyPermissionError,
  Ten99PolicyRateLimitError,
  Ten99PolicyError,
  Ten99PolicyAPIError,
} = require('./Error');

const defaultHttpAgent = new http.Agent({keepAlive: true});
const defaultHttpsAgent = new https.Agent({keepAlive: true});

// Provide extension mechanism for Ten99Policy Resource Sub-Classes
Ten99PolicyResource.extend = utils.protoExtend;

// Expose method-creator
/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'charges' or 'customers')
 * @param [spec.urlParams=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceding the also-optional callback argument
 * @param [spec.encode] Function for mutating input parameters to a method.
 *  Usefully for applying transforms to data on a per-method basis.
 * @param [spec.host] Hostname for the request.
 */
Ten99PolicyResource.method = function ten99PolicyMethod(spec) {
  return function(...args) {
    const callback = typeof args[args.length - 1] == 'function' && args.pop();

    spec.urlParams = utils.extractUrlParams(
      this.createResourcePathWithSymbols(spec.path || '')
    );

    const requestPromise = utils.callbackifyPromiseWithTimeout(
      makeRequest(this, args, spec, {}),
      callback
    );

    return requestPromise;
  };
};

// Prepare (basic) methods
Ten99PolicyResource.BASIC_METHODS = {
  list: Ten99PolicyResource.method({
    method: 'GET',
    methodType: 'list',
  }),

  retrieve: Ten99PolicyResource.method({
    method: 'GET',
    path: '/{id}',
  }),

  create: Ten99PolicyResource.method({
    method: 'POST',
  }),

  update: Ten99PolicyResource.method({
    method: 'PUT',
    path: '{id}',
  }),

  // 'delete' is a reserved keyword
  del: Ten99PolicyResource.method({
    method: 'DELETE',
    path: '{id}',
  }),
};

/**
 * Encapsulates request logic for a Ten99Policy Resource
 */
function Ten99PolicyResource(ten99policy) {
  this._ten99policy = ten99policy;

  this.basePath = utils.makeURLInterpolator(
    this.basePath || ten99policy.getApiField('basePath')
  );

  this.resourcePath = this.path;
  this.path = utils.makeURLInterpolator(this.path);

  if (this.includeBasic) {
    this.includeBasic.forEach(function(methodName) {
      this[methodName] = Ten99PolicyResource.BASIC_METHODS[methodName];
    }, this);
  }

  this.initialize(...arguments);
}

Ten99PolicyResource.prototype = {
  path: '',

  // Methods that don't use the API's default '/v1' path can override it with this setting.
  basePath: null,

  initialize() {},

  // Function to override the default data processor. This allows full control
  // over how a Ten99PolicyResource's request data will get converted into an HTTP
  // body. This is useful for non-standard HTTP requests. The function should
  // take method name, data, and headers as arguments.
  requestDataProcessor: null,

  // Function to add a validation checks before sending the request, errors should
  // be thrown, and they will be passed to the callback/promise.
  validateRequest: null,

  createFullPath(commandPath, urlData) {
    return path
      .join(
        this.basePath(urlData),
        this.path(urlData),
        typeof commandPath == 'function' ? commandPath(urlData) : commandPath
      )
      .replace(/\\/g, '/'); // ugly workaround for Windows
  },

  // Creates a relative resource path with symbols left in (unlike
  // createFullPath which takes some data to replace them with). For example it
  // might produce: /invoices/{id}
  createResourcePathWithSymbols(pathWithSymbols) {
    return `/${path
      .join(this.resourcePath, pathWithSymbols || '')
      .replace(/\\/g, '/')}`; // ugly workaround for Windows
  },

  _timeoutHandler(timeout, req, callback) {
    return () => {
      const timeoutErr = new TypeError('ETIMEDOUT');
      timeoutErr.code = 'ETIMEDOUT';

      req.destroy(timeoutErr);
    };
  },

  _responseHandler(req, callback) {
    return (res) => {
      let response = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        response += chunk;
      });
      res.once('end', () => {
        const headers = res.headers || {};
        // NOTE: Ten99Policy responds with lowercase header names/keys.

        // For convenience, make some headers easily accessible on
        // lastResponse.
        res.requestId = headers['request-id'];

        const ten99policyAccount = headers['ten99policy-account'];
        if (ten99policyAccount) {
          res.ten99policyAccount = ten99policyAccount;
        }

        const apiVersion = headers['ten99policy-version'];
        if (apiVersion) {
          res.apiVersion = apiVersion;
        }

        const idempotencyKey = headers['idempotency-key'];
        if (idempotencyKey) {
          res.idempotencyKey = idempotencyKey;
        }

        const requestEndTime = Date.now();
        const requestDurationMs = requestEndTime - req._requestStart;

        const responseEvent = utils.removeNullish({
          api_version: headers['ten99policy-version'],
          account: headers['ten99policy-account'],
          idempotency_key: headers['idempotency-key'],
          method: req._requestEvent.method,
          path: req._requestEvent.path,
          status: res.statusCode,
          request_id: res.requestId,
          elapsed: requestDurationMs,
          request_start_time: req._requestStart,
          request_end_time: requestEndTime,
        });

        this._ten99policy._emitter.emit('response', responseEvent);

        try {
          response = JSON.parse(response);

          if (response.error) {
            let err;

            // Convert OAuth error responses into a standard format
            // so that the rest of the error logic can be shared
            if (typeof response.error === 'string') {
              response.error = {
                type: response.error,
                message: response.error_description,
              };
            }

            response.error.headers = headers;
            response.error.statusCode = res.statusCode;
            response.error.requestId = res.requestId;

            if (res.statusCode === 401) {
              err = new Ten99PolicyAuthenticationError(response.error);
            } else if (res.statusCode === 403) {
              err = new Ten99PolicyPermissionError(response.error);
            } else if (res.statusCode === 429) {
              err = new Ten99PolicyRateLimitError(response.error);
            } else {
              err = Ten99PolicyError.generate(response.error);
            }
            return callback.call(this, err, null);
          }
        } catch (e) {
          return callback.call(
            this,
            new Ten99PolicyAPIError({
              message: 'Invalid JSON received from the Ten99Policy API',
              response,
              exception: e,
              requestId: headers['request-id'],
            }),
            null
          );
        }

        // Expose res object
        Object.defineProperty(response, 'lastResponse', {
          enumerable: false,
          writable: false,
          value: res,
        });
        callback.call(this, null, response);
      });
    };
  },

  _generateConnectionErrorMessage(requestRetries) {
    return `An error occurred with our connection to Ten99Policy.${
      requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ''
    }`;
  },

  _errorHandler(req, requestRetries, callback) {
    return (message, detail) => {
      callback.call(
        this,
        new Ten99PolicyConnectionError({
          message: this._generateConnectionErrorMessage(requestRetries),
          detail: error,
        }),
        null
      );
    };
  },

  _shouldRetry(res, numRetries, maxRetries) {
    // Do not retry if we are out of retries.
    if (numRetries >= maxRetries) {
      return false;
    }

    // Retry on connection error.
    if (!res) {
      return true;
    }

    // The API may ask us not to retry (e.g., if doing so would be a no-op)
    // or advise us to retry (e.g., in cases of lock timeouts); we defer to that.
    if (res.headers && res.headers['ten99policy-should-retry'] === 'false') {
      return false;
    }
    if (res.headers && res.headers['ten99policy-should-retry'] === 'true') {
      return true;
    }

    // Retry on conflict errors.
    if (res.statusCode === 409) {
      return true;
    }

    // Retry on 500, 503, and other internal errors.
    //
    // Note that we expect the ten99policy-should-retry header to be false
    // in most cases when a 500 is returned, since our idempotency framework
    // would typically replay it anyway.
    if (res.statusCode >= 500) {
      return true;
    }

    return false;
  },

  _getSleepTimeInMS(numRetries, retryAfter = null) {
    const initialNetworkRetryDelay = this._ten99policy.getInitialNetworkRetryDelay();
    const maxNetworkRetryDelay = this._ten99policy.getMaxNetworkRetryDelay();

    // Apply exponential backoff with initialNetworkRetryDelay on the
    // number of numRetries so far as inputs. Do not allow the number to exceed
    // maxNetworkRetryDelay.
    let sleepSeconds = Math.min(
      initialNetworkRetryDelay * Math.pow(numRetries - 1, 2),
      maxNetworkRetryDelay
    );

    // Apply some jitter by randomizing the value in the range of
    // (sleepSeconds / 2) to (sleepSeconds).
    sleepSeconds *= 0.5 * (1 + Math.random());

    // But never sleep less than the base sleep seconds.
    sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);

    // And never sleep less than the time the API asks us to wait, assuming it's a reasonable ask.
    if (Number.isInteger(retryAfter) && retryAfter <= 60) {
      sleepSeconds = Math.max(sleepSeconds, retryAfter);
    }

    return sleepSeconds * 1000;
  },

  // Max retries can be set on a per request basis. Favor those over the global setting
  _getMaxNetworkRetries(settings = {}) {
    return settings.maxNetworkRetries &&
      Number.isInteger(settings.maxNetworkRetries)
      ? settings.maxNetworkRetries
      : this._ten99policy.getMaxNetworkRetries();
  },

  _defaultIdempotencyKey(method, settings) {
    // If this is a POST and we allow multiple retries, ensure an idempotency key.
    const maxRetries = this._getMaxNetworkRetries(settings);

    if (method === 'POST' && maxRetries > 0) {
      return `ten99policy-node-retry-${utils.uuid4()}`;
    }
    return null;
  },

  _makeHeaders(
    auth,
    contentLength,
    apiVersion,
    clientUserAgent,
    method,
    userSuppliedHeaders,
    userSuppliedSettings
  ) {
    const defaultHeaders = {
      // Use specified auth token or use default from this ten99policy instance:
      Authorization: auth
        ? `Bearer ${auth}`
        : this._ten99policy.getApiField('auth'),
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': contentLength,
      'User-Agent': this._getUserAgentString(),
      'X-Ten99Policy-Client-User-Agent': clientUserAgent,
      'Ten99Policy-Version': apiVersion,
      'Idempotency-Key': this._defaultIdempotencyKey(
        method,
        userSuppliedSettings
      ),
    };

    return Object.assign(
      utils.removeNullish(defaultHeaders),
      // If the user supplied, say 'idempotency-key', override instead of appending by ensuring caps are the same.
      utils.normalizeHeaders(userSuppliedHeaders)
    );
  },

  _getUserAgentString() {
    const packageVersion = this._ten99policy.getConstant('PACKAGE_VERSION');

    return `Ten99Policy/v1 NodeBindings/${packageVersion}`.trim();
  },

  _request(method, host, path, data, auth, options = {}, callback) {
    let requestData;

    const retryRequest = (
      requestFn,
      apiVersion,
      headers,
      requestRetries,
      retryAfter
    ) => {
      return setTimeout(
        requestFn,
        this._getSleepTimeInMS(requestRetries, retryAfter),
        apiVersion,
        headers,
        requestRetries + 1
      );
    };

    const makeRequest = (apiVersion, headers, numRetries) => {
      // timeout can be set on a per-request basis. Favor that over the global setting
      const timeout =
        options.settings &&
        Number.isInteger(options.settings.timeout) &&
        options.settings.timeout >= 0
          ? options.settings.timeout
          : this._ten99policy.getApiField('timeout');

      const isInsecureConnection =
        this._ten99policy.getApiField('protocol') === 'http';
      let agent = this._ten99policy.getApiField('agent');
      if (agent == null) {
        agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
      }

      const req = (isInsecureConnection ? http : https).request({
        host: host || this._ten99policy.getApiField('host'),
        port: this._ten99policy.getApiField('port'),
        path,
        method,
        agent,
        headers,
        ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
      });

      const requestStartTime = Date.now();

      const requestEvent = utils.removeNullish({
        api_version: apiVersion,
        account: headers['Ten99Policy-Account'],
        idempotency_key: headers['Idempotency-Key'],
        method,
        path,
        request_start_time: requestStartTime,
      });

      const requestRetries = numRetries || 0;

      const maxRetries = this._getMaxNetworkRetries(options.settings);

      req._requestEvent = requestEvent;

      req._requestStart = requestStartTime;

      this._ten99policy._emitter.emit('request', requestEvent);

      req.setTimeout(timeout, this._timeoutHandler(timeout, req, callback));

      req.once('response', (res) => {
        if (this._shouldRetry(res, requestRetries, maxRetries)) {
          return retryRequest(
            makeRequest,
            apiVersion,
            headers,
            requestRetries,
            ((res || {}).headers || {})['retry-after']
          );
        } else {
          return this._responseHandler(req, callback)(res);
        }
      });

      req.on('error', (error) => {
        if (this._shouldRetry(null, requestRetries, maxRetries)) {
          return retryRequest(
            makeRequest,
            apiVersion,
            headers,
            requestRetries,
            null
          );
        } else {
          if (error.code === 'ETIMEDOUT') {
            return callback.call(
              this,
              new Ten99PolicyConnectionError({
                message: `Request aborted due to timeout being reached (${timeout}ms)`,
                detail: error,
              })
            );
          }
          return callback.call(
            this,
            new Ten99PolicyConnectionError({
              message: this._generateConnectionErrorMessage(requestRetries),
              detail: error,
            }),
            null
          );
        }
      });

      req.once('socket', (socket) => {
        if (socket.connecting) {
          socket.once(
            isInsecureConnection ? 'connect' : 'secureConnect',
            () => {
              // Send payload; we're safe:
              req.write(JSON.stringify(requestData));
              req.end();
            }
          );
        } else {
          // we're already connected
          req.write(JSON.stringify(requestData));
          req.end();
        }
      });
    };

    const prepareAndMakeRequest = (error, data) => {
      if (error) {
        return callback(error);
      }

      requestData = data;

      this._ten99policy.getClientUserAgent((clientUserAgent) => {
        const apiVersion = this._ten99policy.getApiField('version');
        const headers = this._makeHeaders(
          auth,
          requestData.length,
          apiVersion,
          clientUserAgent,
          method,
          options.headers,
          options.settings
        );

        makeRequest(apiVersion, headers);
      });
    };

    if (this.requestDataProcessor) {
      this.requestDataProcessor(
        method,
        data,
        options.headers,
        prepareAndMakeRequest
      );
    } else {
      prepareAndMakeRequest(null, data || {});
    }
  },
};

module.exports = Ten99PolicyResource;
