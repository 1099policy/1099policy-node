/* eslint-disable new-cap */

'use strict';

const testUtils = require('../testUtils');
const Ten99Policy = require('../lib/ten99policy');
const expect = require('chai').expect;
const cleanup = new testUtils.CleanupUtility();

const ten99policy = new Ten99Policy({
  key: 't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca',
  host: 'localhost',
  port: '5000',
  protocol: 'http',
});

const contractorData = {
  company_name: 'John & Friends',
  first_name: 'John',
  last_name: 'Doe',
  email: `example-${Math.random().toString(36).substring(7)}@gmail.com`,
  phone: '415-111-1111',
  address: {
    line1: '2211 Mission St',
    line2: '',
    locality: 'San Francisco,',
    region: 'CA',
    postalcode: '94110',
  },
};

describe('Ten99Policy Module', function() {
  this.timeout(20000);

  describe('config object', () => {
    it('should only accept an object', () => {
      expect(() => {
        Ten99Policy(123456);
      }).to.throw(/Config must be an object/);

      expect(() => {
        Ten99Policy({
          incorrectKey: true,
        });
      }).to.throw(
        /Config object may only contain the following:/
      );

      expect(() => {
        Ten99Policy({
          key: testUtils.getUserTen99PolicyKey(),
          maxNetworkRetries: 2,
          timeout: 123,
          host: 'foo.ten99policy.com',
        });
      }).to.not.throw();
    });

    it('should forbid sending http to *.ten99policy.com', () => {
      expect(() => {
        Ten99Policy({
          key: testUtils.getUserTen99PolicyKey(),
          host: 'foo.ten99policy.com',
          protocol: 'http',
        });
      }).to.throw(/The `https` protocol must be used/);

      expect(() => {
        Ten99Policy({
          key: testUtils.getUserTen99PolicyKey(),
          protocol: 'http',
        });
      }).to.throw(/The `https` protocol must be used/);

      expect(() => {
        Ten99Policy({
          key: testUtils.getUserTen99PolicyKey(),
          protocol: 'http',
          host: 'api.ten99policy.com',
        });
      }).to.throw(/The `https` protocol must be used/);

      expect(() => {
        Ten99Policy({
          key: testUtils.getUserTen99PolicyKey(),
          protocol: 'https',
          host: 'api.ten99policy.com',
        });
      }).not.to.throw();

      expect(() => {
        Ten99Policy({
          key: testUtils.getUserTen99PolicyKey(),
          host: 'api.ten99policy.com',
        });
      }).not.to.throw();

      expect(() => {
        Ten99Policy({
          key: testUtils.getUserTen99PolicyKey(),
          protocol: 'http',
          host: 'localhost',
        });
      }).not.to.throw();
    });

    describe('setApiKey', () => {
      it('uses Bearer auth', () => {
        expect(ten99policy.getApiField('auth')).to.equal(
          `Bearer ${testUtils.getUserTen99PolicyKey()}`
        );
      });
    });

    describe('Callback support', () => {
      describe('Any given endpoint', () => {
        it('Will call a callback if successful', () =>
          expect(
            new Promise((resolve, reject) => {
              // this is just to ensure our api creates a new record
              contractorData.email = `example-${Math.random().toString(36).substring(7)}@gmail.com`;

              ten99policy.contractors.create(contractorData, (err, contractor) => {
                cleanup.deleteContractor(contractor.id);
                resolve('Called!');
              });
            })
          ).to.eventually.equal('Called!'));

        describe('lastResponse', () => {
          it('Will expose HTTP response object', () =>
            expect(
              new Promise((resolve, reject) => {
                // this is just to ensure our api creates a new record
                contractorData.email = `example-${Math.random().toString(36).substring(7)}@gmail.com`;

                ten99policy.contractors.create(contractorData, (err, contractor) => {
                  cleanup.deleteContractor(contractor.id);

                  const headers = contractor.lastResponse.headers;
                  expect(headers).to.contain.keys('server');

                  resolve('Called!');
                });
              })
            ).to.eventually.equal('Called!'));
        });

        it('Given an error the callback will receive it', () =>
          expect(
            new Promise((resolve, reject) => {
              ten99policy.contractors.update(
                'nonExistentContractorId',
                {wrongContractor: {}},
                (err, contract) => {
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
  });
});
