'use strict';

/* -----------------------------------------------------------------------------------*/
/* Initialize 1099Policy API client
/*-----------------------------------------------------------------------------------*/

const Ten99Policy = require('../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca',
  host: '127.0.0.1',
  port: '5000',
  protocol: 'http',
  environment: 'sandbox',
});

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of events
/*-----------------------------------------------------------------------------------*/

ten99policy.events
  .list()
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving a event (replace xxx with an existing event id)
/*-----------------------------------------------------------------------------------*/

ten99policy.events
  .retrieve('xxx')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
