'use strict';

// NOTE: testUtils should be require'd before anything else in each spec file!

require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
require('chai').use(require('chai-as-promised'));

const http = require('http');

const CryptoProvider = require('../lib/crypto/CryptoProvider');
const ResourceNamespace = require('../lib/ResourceNamespace').ResourceNamespace;

const testingHttpAgent = new http.Agent({keepAlive: false});

const utils = (module.exports = {
  getTestServerTen99Policy: (clientOptions, handler, callback) => {
    const server = http.createServer((req, res) => {
      const {shouldStayOpen} = handler(req, res) || {};
      if (!shouldStayOpen) {
        res.on('close', () => {
          server.close();
        });
      }
    });
    server.listen(0, () => {
      const {port} = server.address();
      const ten99policy = require('../lib/ten99policy')(
        module.exports.getUserTen99PolicyKey(),
        {
          host: '127.0.0.1',
          port,
          protocol: 'http',
          httpAgent: testingHttpAgent,
          ...clientOptions,
        }
      );
      return callback(null, ten99policy, () => {
        server.close();
      });
    });
  },

  getTen99PolicyMockClient: () => {
    const ten99policy = require('../lib/ten99policy');

    return ten99policy('sk_test_123', {
      host: process.env.STRIPE_MOCK_HOST || 'localhost',
      port: process.env.STRIPE_MOCK_PORT || 12111,
      protocol: 'http',
    });
  },

  getUserTen99PolicyKey: () => {
    const key =
      process.env.STRIPE_TEST_API_KEY || 'tGN0bIwXnHdwOa85VABjPdSn8nWY7G7I';

    return key;
  },

  getSpyableTen99Policy: () => {
    // Provide a testable ten99policy instance
    // That is, with mock-requests built in and hookable

    const ten99policy = require('../lib/ten99policy');
    const ten99policyInstance = ten99policy('fakeAuthToken');

    ten99policyInstance.REQUESTS = [];

    for (const i in ten99policyInstance) {
      makeInstanceSpyable(ten99policyInstance, ten99policyInstance[i]);
    }

    function makeInstanceSpyable(ten99policyInstance, thisInstance) {
      if (thisInstance instanceof ten99policy.Ten99PolicyResource) {
        patchRequest(ten99policyInstance, thisInstance);
      } else if (thisInstance instanceof ResourceNamespace) {
        const namespace = thisInstance;

        for (const j in namespace) {
          makeInstanceSpyable(ten99policyInstance, namespace[j]);
        }
      }
    }

    function patchRequest(ten99policyInstance, instance) {
      instance._request = function(method, host, url, data, auth, options, cb) {
        const req = (ten99policyInstance.LAST_REQUEST = {
          method,
          url,
          data,
          headers: options.headers || {},
          settings: options.settings || {},
        });
        if (auth) {
          req.auth = auth;
        }
        if (host) {
          req.host = host;
        }

        const handleMockRequest = (err, req) => {
          ten99policyInstance.REQUESTS.push(req);
          cb.call(this, err, {});
        };

        if (this.requestDataProcessor) {
          this.requestDataProcessor(
            method,
            data,
            options.headers,
            handleMockRequest
          );
        } else {
          handleMockRequest(null, req);
        }
      };
    }

    return ten99policyInstance;
  },

  /**
   * A utility where cleanup functions can be registered to be called post-spec.
   * CleanupUtility will automatically register on the mocha afterEach hook,
   * ensuring its called after each descendent-describe block.
   */
  CleanupUtility: (() => {
    CleanupUtility.DEFAULT_TIMEOUT = 20000;

    function CleanupUtility(timeout) {
      const self = this;
      this._cleanupFns = [];
      this._ten99policy = require('../lib/ten99policy')(
        utils.getUserTen99PolicyKey(),
        'latest'
      );
      afterEach(function(done) {
        this.timeout(timeout || CleanupUtility.DEFAULT_TIMEOUT);
        return self.doCleanup(done);
      });
    }

    CleanupUtility.prototype = {
      doCleanup(done) {
        const cleanups = this._cleanupFns;
        const total = cleanups.length;
        let completed = 0;
        let fn;
        while ((fn = cleanups.shift())) {
          const promise = fn.call(this);
          if (!promise || !promise.then) {
            throw new Error(
              'CleanupUtility expects cleanup functions to return promises!'
            );
          }
          promise.then(
            () => {
              // cleanup successful
              completed += 1;
              if (completed === total) {
                done();
              }
            },
            (err) => {
              // not successful
              throw err;
            }
          );
        }
        if (total === 0) {
          done();
        }
      },
      add(fn) {
        this._cleanupFns.push(fn);
      },
      deleteCustomer(custId) {
        this.add(function() {
          return this._ten99policy.customers.del(custId);
        });
      },
      deletePlan(pId) {
        this.add(function() {
          return this._ten99policy.plans.del(pId);
        });
      },
      deleteCoupon(cId) {
        this.add(function() {
          return this._ten99policy.coupons.del(cId);
        });
      },
      deleteInvoiceItem(iiId) {
        this.add(function() {
          return this._ten99policy.invoiceItems.del(iiId);
        });
      },
    };

    return CleanupUtility;
  })(),

  /**
   * Get a random string for test Object creation
   */
  getRandomString: () => {
    return Math.random()
      .toString(36)
      .slice(2);
  },

  envSupportsForAwait: () => {
    return typeof Symbol !== 'undefined' && Symbol.asyncIterator;
  },

  FakeCryptoProvider: class extends CryptoProvider {
    computeHMACSignature(payload, secret) {
      return 'fake signature';
    }

    computeHMACSignatureAsync(payload, secret) {
      return Promise.resolve('fake signature');
    }
  },
});
