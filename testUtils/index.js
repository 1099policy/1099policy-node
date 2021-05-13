'use strict';

require('mocha');
require('chai').use(require('chai-as-promised'));

const utils = (module.exports = {
  getUserTen99PolicyKey: () => {
    const key =
      process.env.TEN99POLICY_TEST_API_KEY ||
      't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca';

    return key;
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
