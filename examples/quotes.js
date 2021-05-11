'use strict';

/*-----------------------------------------------------------------------------------*/
/* Initialize 1099Policy API client
/*-----------------------------------------------------------------------------------*/

const T99P = require('../lib/ten99policy.js');
const ten99policy = new T99P({
  'key': 't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca',
  'host': 'localhost',
  'port': '5000',
  'protocol': 'http',
})

/*-----------------------------------------------------------------------------------*/
/* Creating a quote
/*-----------------------------------------------------------------------------------*/

ten99policy.quotes.create({
  job_id: "xxx",
  contractor_id: "xxx",
  coverage_type: "general"
})
  .then(message => console.log(message))
  .catch(error => console.error(error));
