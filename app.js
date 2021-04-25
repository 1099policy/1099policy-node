const T99P = require('./lib/ten99policy.js');

const ten99policy = new T99P({
  'key': 't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca',
  'host': 'localhost',
  'port': '5000',
  'protocol': 'http',
})

// ten99policy.contractors.retrieve('2').catch(error => console.error(error));

ten99policy.contractors.create({
  email: 'customer@example.com',
})
  .then(message => console.log(message))
  .catch(error => console.error(error));
