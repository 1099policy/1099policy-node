'use strict';

/* -----------------------------------------------------------------------------------*/
/* Initialize 1099Policy API client
/*-----------------------------------------------------------------------------------*/

const Ten99Policy = require('../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_651c791e-739d-46a1-b48c-5f9488c7f21c',
  host: '127.0.0.1',
  port: '5000',
  protocol: 'http',
  environment: 'sandbox',
});

/* -----------------------------------------------------------------------------------*/
/* Creating a contractor
/*-----------------------------------------------------------------------------------*/

ten99policy.contractors
  .create({
    company_name: 'John & Friends',
    first_name: 'John',
    last_name: 'Doe',
    email: 'xxx@gmail.com',
    phone: '415-111-1111',
    tax_identification: 123,
    address: {
      line1: '2211 Mission St',
      line2: '',
      locality: 'San Francisco,',
      region: 'CA',
      postalcode: '94110',
    },
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a contractor (replace xxx with an existing contractor id)
/*-----------------------------------------------------------------------------------*/

ten99policy.contractors
  .update('xxx', {
    company_name: "Bill's Plumbing",
    address: {
      line1: '123 Main St.',
      locality: 'San Francisco',
    },
  })
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of contractors
/*-----------------------------------------------------------------------------------*/

ten99policy.contractors
  .list()
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Retrieving a contractor (replace xxx with an existing contractor id)
/*-----------------------------------------------------------------------------------*/

ten99policy.contractors
  .retrieve('xxx')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Delete a contractor (replace xxx with an existing contractor id)
/*-----------------------------------------------------------------------------------*/

ten99policy.contractors
  .del('cn_CATEjCBsVJ')
  .then((message) => console.log(message))
  .catch((error) => console.error(error));
