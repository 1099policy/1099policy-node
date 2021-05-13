'use strict';

const ten99policy = require('../../testUtils').getSpyableTen99Policy();
const expect = require('chai').expect;

const TEST_AUTH_KEY = 'aGN0bIwXnHdw5645VABjPdSn8nWY7G11';

describe('Jobs Resource', () => {
  describe('retrieve', () => {
    it('Sends the correct request', () => {
      ten99policy.jobs.retrieve('abcdef');
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/api/v1/jobs/abcdef',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth]', () => {
      ten99policy.jobs.retrieve('abcdef', TEST_AUTH_KEY);
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/api/v1/jobs/abcdef',
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
      ten99policy.jobs.create({description: 'Some job'});
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/jobs',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {description: 'Some job'},
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth]', () => {
      ten99policy.jobs.create({description: 'Some job'}, TEST_AUTH_KEY);
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/jobs',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {description: 'Some job'},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth and no body]', () => {
      ten99policy.jobs.create(TEST_AUTH_KEY);
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/jobs',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified idempotencyKey in options]', () => {
      ten99policy.jobs.create(
        {description: 'Some job'},
        {idempotencyKey: 'foo'}
      );
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/jobs',
        headers: {
          'Idempotency-Key': 'foo',
          'Content-Type': 'application/json',
        },
        data: {description: 'Some job'},
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth in options]', () => {
      ten99policy.jobs.create(
        {description: 'Some job'},
        {apiKey: TEST_AUTH_KEY}
      );
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/jobs',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {description: 'Some job'},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth and idempotent key in options]', () => {
      ten99policy.jobs.create(
        {description: 'Some job'},
        {apiKey: TEST_AUTH_KEY, idempotencyKey: 'foo'}
      );
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/jobs',
        headers: {
          'Idempotency-Key': 'foo',
          'Content-Type': 'application/json',
        },
        data: {description: 'Some job'},
        auth: TEST_AUTH_KEY,
        settings: {},
      });
    });

    it('Sends the correct request [with specified auth in options and no body]', () => {
      ten99policy.jobs.create({apiKey: TEST_AUTH_KEY});
      expect(ten99policy.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/api/v1/jobs',
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
        ten99policy.jobs.update('abcdef', {
          description: 'Foo "baz"',
        });
        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'PUT',
          url: '/api/v1/jobs/abcdef',
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
        ten99policy.jobs.del('abcdef');
        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'DELETE',
          url: '/api/v1/jobs/abcdef',
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
        ten99policy.jobs.list();
        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/v1/jobs',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {},
          settings: {},
        });
      });

      it('Sends the correct request [with specified auth]', () => {
        ten99policy.jobs.list(TEST_AUTH_KEY);
        expect(ten99policy.LAST_REQUEST).to.deep.equal({
          method: 'GET',
          url: '/api/v1/jobs',
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
