'use strict';

/* -----------------------------------------------------------------------------------*/
/* Initialize 1099Policy API client
/*-----------------------------------------------------------------------------------*/

const Ten99Policy = require('../../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca',
  host: '127.0.0.1',
  port: '5000',
  protocol: 'http',
  environment: 'sandbox',
});

/* -----------------------------------------------------------------------------------*/
/* Creating a session
/*-----------------------------------------------------------------------------------*/

ten99policy.apply.sessions
  .create({
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
    job_id: 'jb_btVCTcxSYD',
    contractor_id: 'cn_X8mas2QhUd',
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of sessions
/*-----------------------------------------------------------------------------------*/

ten99policy.apply.sessions
  .list()
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving a session (replace xxx with an existing session id)
/*-----------------------------------------------------------------------------------*/

ten99policy.apply.sessions
  .retrieve('ias_01F6JEG9Z46WKWDEKE83YMFQYE')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
