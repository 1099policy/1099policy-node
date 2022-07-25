/* eslint-disable new-cap */

'use strict';

const testUtils = require('../testUtils');
const utils = require('../lib/utils');
const Ten99policy = require('../lib/ten99policy');
const ten99policy = require('../lib/ten99policy')(testUtils.getUserTen99policyKey(), 'latest');
const crypto = require('crypto');

const expect = require('chai').expect;

const CUSTOMER_DETAILS = {
  description: 'Some customer',
  card: 'tok_visa',
};

describe('Ten99policy Module', function() {
  const cleanup = new testUtils.CleanupUtility();
  this.timeout(20000);

  describe('config object', () => {
    it('should only accept either an object or a string', () => {
      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), 123);
      }).to.throw(/Config must either be an object or a string/);

      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), ['2019-12-12']);
      }).to.throw(/Config must either be an object or a string/);

      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), '2019-12-12');
      }).to.not.throw();

      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), {
          apiVersion: 'latest',
        });
      }).to.not.throw();
    });

    it('should only contain allowed properties', () => {
      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), {
          foo: 'bar',
          apiVersion: 'latest',
        });
      }).to.throw(/Config object may only contain the following:/);

      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), {
          apiVersion: '2019-12-12',
          maxNetworkRetries: 2,
          httpAgent: 'agent',
          timeout: 123,
          host: 'foo.1099policy.com',
          port: 321,
        });
      }).to.not.throw();
    });
    it('should forbid sending http to *.1099policy.com', () => {
      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), {
          host: 'foo.1099policy.com',
          protocol: 'http',
        });
      }).to.throw(/The `https` protocol must be used/);

      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), {
          protocol: 'http',
        });
      }).to.throw(/The `https` protocol must be used/);

      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), {
          protocol: 'http',
          host: 'api.1099policy.com',
        });
      }).to.throw(/The `https` protocol must be used/);

      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), {
          protocol: 'https',
          host: 'api.1099policy.com',
        });
      }).not.to.throw();

      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), {
          host: 'api.1099policy.com',
        });
      }).not.to.throw();

      expect(() => {
        Ten99policy(testUtils.getUserTen99policyKey(), {
          protocol: 'http',
          host: '127.0.0.1',
        });
      }).not.to.throw();
    });

    it('should perform a no-op if null, undefined or empty values are passed', () => {
      const cases = [null, undefined, '', {}];

      cases.forEach((item) => {
        expect(() => {
          Ten99policy(testUtils.getUserTen99policyKey(), item);
        }).to.not.throw();
      });

      cases.forEach((item) => {
        const ten99policy = Ten99policy(testUtils.getUserTen99policyKey(), item);
        expect(ten99policy.getApiField('version')).to.equal(null);
      });
    });

    it('should enable telemetry if not explicitly set', () => {
      const newTen99policy = Ten99policy(testUtils.getUserTen99policyKey());

      expect(newTen99policy.getTelemetryEnabled()).to.equal(true);
    });

    it('should enable telemetry if anything but "false" is set', () => {
      const vals = ['foo', null, undefined];
      let newTen99policy;

      vals.forEach((val) => {
        newTen99policy = Ten99policy(testUtils.getUserTen99policyKey(), {
          telemetry: val,
        });

        expect(newTen99policy.getTelemetryEnabled()).to.equal(true);
      });

      newTen99policy = Ten99policy(testUtils.getUserTen99policyKey(), {
        telemetry: false,
      });

      expect(newTen99policy.getTelemetryEnabled()).to.equal(false);
    });
  });

  describe('setApiKey', () => {
    it('uses Bearer auth', () => {
      expect(ten99policy.getApiField('auth')).to.equal(
        `Bearer ${testUtils.getUserTen99policyKey()}`
      );
    });
  });

  describe('GetClientUserAgent', () => {
    it('Should return a user-agent serialized JSON object', () =>
      expect(
        new Promise((resolve, reject) => {
          ten99policy.getClientUserAgent((c) => {
            resolve(JSON.parse(c));
          });
        })
      ).to.eventually.have.property('lang', 'node'));

    it('Should return platform and version in the serialized user agent JSON object', async () => {
      // Check that the testing environment actually has a process global.
      expect(process.version).to.not.be.empty;
      expect(process.platform).to.not.be.empty;

      const userAgent = await new Promise((resolve, reject) => {
        ten99policy.getClientUserAgent((c) => {
          resolve(JSON.parse(c));
        });
      });

      expect(userAgent).to.have.property('lang_version', process.version);
      expect(userAgent).to.have.property('platform', process.platform);
    });

    it('Should include whether typescript: true was passed, respecting reinstantiations', () => {
      return new Promise((resolve) => resolve())
        .then(() => {
          const ten99policy = new Ten99policy('sk_test_123', {
            typescript: true,
          });
          return expect(
            new Promise((resolve, reject) => {
              ten99policy.getClientUserAgent((c) => {
                resolve(JSON.parse(c));
              });
            })
          ).to.eventually.have.property('typescript', 'true');
        })
        .then(() => {
          const ten99policy = new Ten99policy('sk_test_123', {});
          return expect(
            new Promise((resolve, reject) => {
              ten99policy.getClientUserAgent((c) => {
                resolve(JSON.parse(c));
              });
            })
          ).to.eventually.have.property('typescript', 'false');
        });
    });
  });

  describe('GetClientUserAgentSeeded', () => {
    it('Should return a user-agent serialized JSON object', () => {
      const userAgent = {lang: 'node'};
      return expect(
        new Promise((resolve, reject) => {
          ten99policy.getClientUserAgentSeeded(userAgent, (c) => {
            resolve(JSON.parse(c));
          });
        })
      ).to.eventually.have.property('lang', 'node');
    });

    it('Should URI-encode user-agent fields', () => {
      const userAgent = {lang: 'ï'};
      return expect(
        new Promise((resolve, reject) => {
          ten99policy.getClientUserAgentSeeded(userAgent, (c) => {
            resolve(JSON.parse(c));
          });
        })
      ).to.eventually.have.property('lang', '%C3%AF');
    });

    it('Should URI-encode the HTTP client name', () => {
      const userAgent = {lang: 'ï'};
      return expect(
        new Promise((resolve, reject) => {
          ten99policy.getClientUserAgentSeeded(userAgent, (c) => {
            resolve(JSON.parse(c));
          });
        })
      ).to.eventually.have.property('httplib', 'node');
    });

    describe('uname', () => {
      let origExec;
      beforeEach(() => {
        Ten99policy._UNAME_CACHE = null;
      });
      beforeEach(() => {
        origExec = utils.safeExec;
      });
      afterEach(() => {
        utils.safeExec = origExec;
      });

      it('gets added to the user-agent', () => {
        utils.safeExec = (cmd, cb) => {
          cb(null, 'foøname');
        };
        return expect(
          new Promise((resolve, reject) => {
            ten99policy.getClientUserAgentSeeded({lang: 'node'}, (c) => {
              resolve(JSON.parse(c));
            });
          })
        ).to.eventually.have.property('uname', 'fo%C3%B8name');
      });

      it('sets uname to UNKOWN in case of an error', () => {
        utils.safeExec = (cmd, cb) => {
          cb(new Error('security'), null);
        };
        return expect(
          new Promise((resolve, reject) => {
            ten99policy.getClientUserAgentSeeded({lang: 'node'}, (c) => {
              resolve(JSON.parse(c));
            });
          })
        ).to.eventually.have.property('uname', 'UNKNOWN');
      });
    });
  });

  describe('setTimeout', () => {
    const defaultTimeout = 80000;
    it('Should define a default of 80000', () => {
      expect(ten99policy.getApiField('timeout')).to.equal(defaultTimeout);
    });
    it('Should allow me to set a custom timeout', () => {
      ten99policy.setTimeout(900);
      expect(ten99policy.getApiField('timeout')).to.equal(900);
    });
    it('Should allow me to set null, to reset to the default', () => {
      ten99policy.setTimeout(null);
      expect(ten99policy.getApiField('timeout')).to.equal(defaultTimeout);
    });
  });

  describe('setAppInfo', () => {
    describe('when given nothing or an empty object', () => {
      it('should unset ten99policy._appInfo', () => {
        ten99policy.setAppInfo();
        expect(ten99policy._appInfo).to.be.undefined;
      });
    });

    describe('when not set', () => {
      it('should return empty string', () => {
        expect(ten99policy.getAppInfoAsString()).to.equal('');
      });
    });

    describe('when given a non-object variable', () => {
      it('should throw an error', () => {
        expect(() => {
          ten99policy.setAppInfo('foo');
        }).to.throw(/AppInfo must be an object./);
      });
    });

    describe('when given an object with no `name`', () => {
      it('should throw an error', () => {
        expect(() => {
          ten99policy.setAppInfo({});
        }).to.throw(/AppInfo.name is required/);

        expect(() => {
          ten99policy.setAppInfo({
            version: '1.2.3',
          });
        }).to.throw(/AppInfo.name is required/);

        expect(() => {
          ten99policy.setAppInfo({
            cats: '42',
          });
        }).to.throw(/AppInfo.name is required/);
      });
    });

    describe('when given at least a `name`', () => {
      it('should set name, partner ID, url, and version of ten99policy._appInfo', () => {
        ten99policy.setAppInfo({
          name: 'MyAwesomeApp',
        });
        expect(ten99policy._appInfo).to.eql({
          name: 'MyAwesomeApp',
        });

        ten99policy.setAppInfo({
          name: 'MyAwesomeApp',
          version: '1.2.345',
        });
        expect(ten99policy._appInfo).to.eql({
          name: 'MyAwesomeApp',
          version: '1.2.345',
        });

        ten99policy.setAppInfo({
          name: 'MyAwesomeApp',
          url: 'https://myawesomeapp.info',
        });
        expect(ten99policy._appInfo).to.eql({
          name: 'MyAwesomeApp',
          url: 'https://myawesomeapp.info',
        });

        ten99policy.setAppInfo({
          name: 'MyAwesomeApp',
          partner_id: 'partner_1234',
        });
        expect(ten99policy._appInfo).to.eql({
          name: 'MyAwesomeApp',
          partner_id: 'partner_1234',
        });
      });

      it('should ignore any invalid properties', () => {
        ten99policy.setAppInfo({
          name: 'MyAwesomeApp',
          partner_id: 'partner_1234',
          version: '1.2.345',
          url: 'https://myawesomeapp.info',
          countOfRadishes: 512,
        });
        expect(ten99policy._appInfo).to.eql({
          name: 'MyAwesomeApp',
          partner_id: 'partner_1234',
          version: '1.2.345',
          url: 'https://myawesomeapp.info',
        });
      });
    });

    it('should be included in the ClientUserAgent and be added to the UserAgent String', (done) => {
      const appInfo = {
        name: testUtils.getRandomString(),
        version: '1.2.345',
        url: 'https://myawesomeapp.info',
      };

      ten99policy.setAppInfo(appInfo);

      ten99policy.getClientUserAgent((uaString) => {
        expect(JSON.parse(uaString).application).to.eql(appInfo);

        expect(ten99policy.getAppInfoAsString()).to.eql(
          `${appInfo.name}/${appInfo.version} (${appInfo.url})`
        );

        done();
      });
    });
  });

  describe('Callback support', () => {
    describe('Any given endpoint', () => {
      it('Will call a callback if successful', () =>
        expect(
          new Promise((resolve, reject) => {
            ten99policy.customers.create(CUSTOMER_DETAILS, (err, customer) => {
              cleanup.deleteCustomer(customer.id);
              resolve('Called!');
            });
          })
        ).to.eventually.equal('Called!'));

      describe('lastResponse', () => {
        it('Will expose HTTP response object', () =>
          expect(
            new Promise((resolve, reject) => {
              ten99policy.customers.create(CUSTOMER_DETAILS, (err, customer) => {
                cleanup.deleteCustomer(customer.id);

                const headers = customer.lastResponse.headers;
                expect(headers).to.contain.keys('request-id');

                expect(customer.headers).to.be.undefined;

                resolve('Called!');
              });
            })
          ).to.eventually.equal('Called!'));

        it('Will have request id, status code and version', () =>
          expect(
            new Promise((resolve, reject) => {
              ten99policy.customers.create(CUSTOMER_DETAILS, (_err, customer) => {
                cleanup.deleteCustomer(customer.id);

                expect(customer.lastResponse.requestId).to.match(/^req_/);
                expect(customer.lastResponse.statusCode).to.equal(200);
                expect(customer.lastResponse.apiVersion).to.be.a('string').that
                  .is.not.empty;

                resolve('Called!');
              });
            })
          ).to.eventually.equal('Called!'));

        it('Will have the idempotency key', () =>
          expect(
            new Promise((resolve, reject) => {
              const key = crypto.randomBytes(16).toString('hex');

              ten99policy.customers.create(
                CUSTOMER_DETAILS,
                {
                  idempotencyKey: key,
                },
                (err, customer) => {
                  cleanup.deleteCustomer(customer.id);

                  expect(customer.lastResponse.idempotencyKey).to.equal(key);

                  resolve('Called!');
                }
              );
            })
          ).to.eventually.equal('Called!'));
      });

      it('Given an error the callback will receive it', () =>
        expect(
          new Promise((resolve, reject) => {
            ten99policy.customers.createSource(
              'nonExistentCustId',
              {card: {}},
              (err, customer) => {
                if (err) {
                  resolve('ErrorWasPassed');
                } else {
                  reject(new Error('NoErrorPassed'));
                }
              }
            );
          })
        ).to.eventually.become('ErrorWasPassed'));
    });
  });

  describe('errors', () => {
    it('Exports errors as types', () => {
      const Ten99policy = require('../lib/ten99policy');
      expect(
        new Ten99policy.errors.Ten99policyInvalidRequestError({
          message: 'error',
        }).type
      ).to.equal('Ten99policyInvalidRequestError');
    });
  });

  describe('ten99policyAccount', () => {
    describe('when passed in via the config object', () => {
      let headers;
      let ten99policyClient;
      let closeServer;
      beforeEach((callback) => {
        testUtils.getTestServerTen99policy(
          {
            ten99policyAccount: 'my_ten99policy_account',
          },
          (req, res) => {
            headers = req.headers;
            res.writeHeader(200);
            res.write('{}');
            res.end();
          },
          (err, client, close) => {
            if (err) {
              return callback(err);
            }
            ten99policyClient = client;
            closeServer = close;
            return callback();
          }
        );
      });
      afterEach(() => closeServer());
      it('is respected', (callback) => {
        ten99policyClient.customers.create((err) => {
          closeServer();
          if (err) {
            return callback(err);
          }
          expect(headers['ten99policy-account']).to.equal('my_ten99policy_account');
          return callback();
        });
      });
      it('can still be overridden per-request', (callback) => {
        ten99policyClient.customers.create(
          {ten99policyAccount: 'my_other_ten99policy_account'},
          (err) => {
            closeServer();
            if (err) {
              return callback(err);
            }
            expect(headers['ten99policy-account']).to.equal(
              'my_other_ten99policy_account'
            );
            return callback();
          }
        );
      });
    });
  });

  describe('setMaxNetworkRetries', () => {
    describe('when given an empty or non-number variable', () => {
      it('should error', () => {
        expect(() => {
          ten99policy._setApiNumberField('maxNetworkRetries', 'foo');
        }).to.throw(/maxNetworkRetries must be an integer/);

        expect(() => {
          ten99policy._setApiNumberField('maxNetworkRetries');
        }).to.throw(/maxNetworkRetries must be an integer/);
      });
    });

    describe('when passed in via the config object', () => {
      it('should default to 0 if a non-integer is passed', () => {
        const newTen99policy = Ten99policy(testUtils.getUserTen99policyKey(), {
          maxNetworkRetries: 'foo',
        });

        expect(newTen99policy.getMaxNetworkRetries()).to.equal(0);

        expect(() => {
          Ten99policy(testUtils.getUserTen99policyKey(), {
            maxNetworkRetries: 2,
          });
        }).to.not.throw();
      });

      it('should correctly set the amount of network retries', () => {
        const newTen99policy = Ten99policy(testUtils.getUserTen99policyKey(), {
          maxNetworkRetries: 5,
        });

        expect(newTen99policy.getMaxNetworkRetries()).to.equal(5);
      });
    });

    describe('when not set', () => {
      it('should use the default', () => {
        const newTen99policy = Ten99policy(testUtils.getUserTen99policyKey());

        expect(newTen99policy.getMaxNetworkRetries()).to.equal(0);
      });
    });
  });

  describe('VERSION', () => {
    it('should return the current package version', () => {
      const newTen99policy = Ten99policy(testUtils.getUserTen99policyKey());

      expect(newTen99policy.VERSION).to.equal(Ten99policy.PACKAGE_VERSION);
    });
  });
});
