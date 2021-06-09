'use strict';

const ten99policy = require('../../../testUtils').getSpyableTen99Policy();
const expect = require('chai').expect;

const TEST_AUTH_KEY = 'aGN0bIwXnHdw5645VABjPdSn8nWY7G11';

describe('Apply Sessions', () => {
  describe('Sessions Resource', () => {
    describe('create', () => {
      it('Sends the correct request', () => {
        const params = {
          success_url: 'https://1099policy.com/success',
          cancel_url: 'https://1099policy.com/cancel',
        };

        ten99policy.apply.sessions.create(params);

        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'POST',
          url: '/api/v1/apply/sessions',
          headers: {
            'Content-Type': 'application/json',
          },
          data: params,
          settings: {},
        });
      });
    });

    describe('retrieve', () => {
      it('Sends the correct request', () => {
        ten99policy.apply.sessions.retrieve('cs_123');
        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/v1/apply/sessions/cs_123',
          data: {},
          headers: {
            'Content-Type': 'application/json',
          },
          settings: {},
        });
      });
    });
  });
});
