/* eslint-disable no-loop-func */
/* eslint-disable lines-around-directive */
'use strict';

require('mocha');
require('chai').use(require('chai-as-promised'));

const ResourceNamespace = require('../lib/ResourceNamespace').ResourceNamespace;

const utils = (module.exports = {
  getUserTen99PolicyKey: () => {
    const key =
      process.env.TEN99POLICY_TEST_API_KEY ||
      't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca';

    return key;
  },

  getSpyableTen99Policy: () => {
    // Provide a testable ten99policy instance
    // That is, with mock-requests built in and hookable

    const ten99policy = require('../lib/ten99policy');
    const ten99policyInstance = ten99policy({
      key: 'fakeAuthToken',
    });

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
      this._ten99policy = require('../lib/ten99policy')({
        key: utils.getUserTen99PolicyKey(),
        host: 'localhost',
        port: '5000',
        protocol: 'http',
      });

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
      deleteContractor(contractorId) {
        this.add(function() {
          return this._ten99policy.contractors.del(contractorId);
        });
      },
    };

    return CleanupUtility;
  })(),
});
