'use strict';

require('mocha');
require('chai').use(require('chai-as-promised'));

module.exports = {
  getUserTen99PolicyKey: () => {
    const key =
      process.env.TEN99POLICY_TEST_API_KEY ||
      't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca';

    return key;
  },
};
