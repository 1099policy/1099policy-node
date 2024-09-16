'use strict';

/* -----------------------------------------------------------------------------------*/
/* Initialize Ten99Policy API client
/* -----------------------------------------------------------------------------------*/

const Ten99Policy = require('../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_c6a100e0-88b2-4548-a9ca-d4b681503946',
  host: '127.0.0.1',
  port: '5000',
  protocol: 'http',
  environment: 'sandbox',
  logCurl: true,
});

/* -----------------------------------------------------------------------------------*/
/* Creating a policy
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .create({
    quote_id: 'qt_UPmEfS6nNK',
    is_active: true,
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a policy (replace xxx with an existing policy id)
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .update('en_C9Z2DmfHSF', {
    is_active: false,
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of policies
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving a policy (replace xxx with an existing policy id)
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .retrieve('en_C9Z2DmfHSF')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Deleting a policy (replace xxx with an existing policy id)
/* -----------------------------------------------------------------------------------*/

ten99policy.policies
  .del('en_C9Z2DmfHSF')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
