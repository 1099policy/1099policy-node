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
/* Creating a policy
/*-----------------------------------------------------------------------------------*/

ten99policy.policies
  .create({
    quote_id: 'xxx',
    is_active: true,
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a policy (replace xxx with an existing policy id)
/*-----------------------------------------------------------------------------------*/

ten99policy.policies
  .update('xxx', {
    is_active: true,
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of policies
/*-----------------------------------------------------------------------------------*/

ten99policy.policies
  .list()
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving a policy (replace xxx with an existing policy id)
/*-----------------------------------------------------------------------------------*/

ten99policy.policies
  .retrieve('xxx')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Delete a policy (replace xxx with an existing policy id)
/*-----------------------------------------------------------------------------------*/

ten99policy.policies
  .del('xxx')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
