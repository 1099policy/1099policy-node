'use strict';

const ten99policy = require('../../testUtils').getSpyableTen99Policy();
const expect = require('chai').expect;

const TEST_AUTH_KEY = 'aGN0bIwXnHdw5645VABjPdSn8nWY7G11';

describe('Entities Resource', () => {
  describe('retrieve', () => {
    it('Sends the correct request', () => {
      ten99policy.entities.retrieve('abcdef');
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/api/v1/entities/abcdef',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth]', () => {
      ten99policy.entities.retrieve('abcdef', TEST_AUTH_KEY);
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/api/v1/entities/abcdef',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      ten99policy.entities.create({description: 'Some entity'});
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/entities',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {description: 'Some entity'},
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth]', () => {
      ten99policy.entities.create({description: 'Some entity'}, TEST_AUTH_KEY);
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/entities',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {description: 'Some entity'},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth and no body]', () => {
      ten99policy.entities.create(TEST_AUTH_KEY);
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/entities',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified idempotencyKey in options]', () => {
      ten99policy.entities.create(
        {description: 'Some entity'},
        {idempotencyKey: 'foo'}
      );
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/entities',
        headers: {
          'Idempotency-Key': 'foo',
          'Content-Type': 'application/json',
        },
        data: {description: 'Some entity'},
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth in options]', () => {
      ten99policy.entities.create(
        {description: 'Some entity'},
        {apiKey: TEST_AUTH_KEY}
      );
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/entities',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {description: 'Some entity'},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth and idempotent key in options]', () => {
      ten99policy.entities.create(
        {description: 'Some entity'},
        {apiKey: TEST_AUTH_KEY, idempotencyKey: 'foo'}
      );
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/entities',
        headers: {
          'Idempotency-Key': 'foo',
          'Content-Type': 'application/json',
        },
        data: {description: 'Some entity'},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth in options and no body]', () => {
      ten99policy.entities.create({apiKey: TEST_AUTH_KEY});
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/entities',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    describe('update', () => {
      it('Sends the correct request', () => {
        ten99policy.entities.update('abcdef', {
          description: 'Foo "baz"',
        });
        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'PUT',
          url: '/api/v1/entities/abcdef',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {description: 'Foo "baz"'},
          settings: {},
        });
      });
    });

    describe('del', () => {
      it('Sends the correct request', () => {
        ten99policy.entities.del('abcdef');
        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'DELETE',
          url: '/api/v1/entities/abcdef',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {},
          settings: {},
        });
      });
    });

    describe('list', () => {
      it('Sends the correct request', () => {
        ten99policy.entities.list();
        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/v1/entities',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {},
          settings: {},
        });
      });

      it('Sends the correct request [with specified auth]', () => {
        ten99policy.entities.list(TEST_AUTH_KEY);
        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/v1/entities',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {},
          auth: TEST_AUTH_KEY,
          settings: {},
        });
      });
    });
  });
});
