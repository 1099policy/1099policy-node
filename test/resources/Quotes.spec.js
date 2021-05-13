'use strict';

const ten99quote = require('../../testUtils').getSpyableTen99Policy();
const expect = require('chai').expect;

const TEST_AUTH_KEY = 'aGN0bIwXnHdw5645VABjPdSn8nWY7G11';

describe('Quote Resource', () => {
  describe('retrieve', () => {
    it('Sends the correct request', () => {
      ten99quote.quotes.retrieve('abcdef');
      expect(ten99quote.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/api/v1/quotes/abcdef',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth]', () => {
      ten99quote.quotes.retrieve('abcdef', TEST_AUTH_KEY);
      expect(ten99quote.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/api/v1/quotes/abcdef',
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
      ten99quote.quotes.create({description: 'Some quote'});
      expect(ten99quote.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/quotes',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {description: 'Some quote'},
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth]', () => {
      ten99quote.quotes.create({description: 'Some quote'}, TEST_AUTH_KEY);
      expect(ten99quote.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/quotes',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {description: 'Some quote'},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth and no body]', () => {
      ten99quote.quotes.create(TEST_AUTH_KEY);
      expect(ten99quote.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/quotes',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified idempotencyKey in options]', () => {
      ten99quote.quotes.create(
        {description: 'Some quote'},
        {idempotencyKey: 'foo'}
      );
      expect(ten99quote.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/quotes',
        headers: {
          'Idempotency-Key': 'foo',
          'Content-Type': 'application/json',
        },
        data: {description: 'Some quote'},
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth in options]', () => {
      ten99quote.quotes.create(
        {description: 'Some quote'},
        {apiKey: TEST_AUTH_KEY}
      );
      expect(ten99quote.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/quotes',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {description: 'Some quote'},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth and idempotent key in options]', () => {
      ten99quote.quotes.create(
        {description: 'Some quote'},
        {apiKey: TEST_AUTH_KEY, idempotencyKey: 'foo'}
      );
      expect(ten99quote.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/quotes',
        headers: {
          'Idempotency-Key': 'foo',
          'Content-Type': 'application/json',
        },
        data: {description: 'Some quote'},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth in options and no body]', () => {
      ten99quote.quotes.create({apiKey: TEST_AUTH_KEY});
      expect(ten99quote.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/quotes',
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
        ten99quote.quotes.update('abcdef', {
          description: 'Foo "baz"',
        });
        expect(ten99quote.LAST_REQUEST).to.deep.equal({
          method: 'PUT',
          url: '/api/v1/quotes/abcdef',
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
        ten99quote.quotes.del('abcdef');
        expect(ten99quote.LAST_REQUEST).to.deep.equal({
          method: 'DELETE',
          url: '/api/v1/quotes/abcdef',
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
        ten99quote.quotes.list();
        expect(ten99quote.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/v1/quotes',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {},
          settings: {},
        });
      });

      it('Sends the correct request [with specified auth]', () => {
        ten99quote.quotes.list(TEST_AUTH_KEY);
        expect(ten99quote.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/v1/quotes',
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
