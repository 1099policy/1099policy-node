'use strict';

/* -----------------------------------------------------------------------------------*/
/* Initialize 1099Policy API client
/*-----------------------------------------------------------------------------------*/

const T99P = require('../../lib/ten99policy.js');
const ten99policy = new T99P({
  key: 't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca',
  host: 'localhost',
  port: '5000',
  protocol: 'http',
});

/* -----------------------------------------------------------------------------------*/
/* Creating a session
/*-----------------------------------------------------------------------------------*/

// ten99policy.apply.sessions
//   .create({
//     quote_id: 'xxx',
//     is_active: true,
//   })
//   .then((message) => console.log(message))
//   .catch((error) => console.error(error));

// /* -----------------------------------------------------------------------------------*/
// /* Updating a session (replace xxx with an existing session id)
// /*-----------------------------------------------------------------------------------*/

// ten99policy.apply.sessions
//   .update('xxx', {
//     is_active: true,
//   })
//   .then((message) => console.log(message))
//   .catch((error) => console.error(error));

// /* -----------------------------------------------------------------------------------*/
// /* Fetching the list of sessions
// /*-----------------------------------------------------------------------------------*/

// ten99policy.apply.sessions
//   .list()
//   .then((message) => console.log(message))
//   .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving a session (replace xxx with an existing session id)
/*-----------------------------------------------------------------------------------*/

ten99policy.apply.sessions
  .retrieve('ias_01F6JFACFPSB6YH9A9Y1CBR6J1')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Delete a session (replace xxx with an existing session id)
/*-----------------------------------------------------------------------------------*/

// ten99policy.apply.sessions
//   .del('xxx')
//   .then((message) => console.log(message))
//   .catch((error) => console.error(error));
