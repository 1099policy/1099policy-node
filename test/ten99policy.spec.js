/* eslint-disable new-cap */

'use strict';

const testUtils = require('../testUtils');
const Ten99Policy = require('../lib/ten99policy');
const expect = require('chai').expect;

describe('Ten99Policy Module', function() {
  describe('config object', () => {
    it('should only accept an object', () => {
      // expect(() => {
      //   Ten99Policy(123456);
      // }).to.throw(/Config must be an object/);

      expect(() => {
        Ten99Policy({
          incorrectKey: true,
        });
      }).to.throw(
        /Config object may only contain the following: key, apiVersion, maxNetworkRetries, timeout, host, port, protocol/
      );

      expect(() => {
        Ten99Policy({
          key: testUtils.getUserTen99PolicyKey(),
        });
      }).to.not.throw();
    });
  });
});
