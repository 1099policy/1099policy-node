const T99P = require('./lib/ten99policy.js');

const ten99policy = new T99P({
  'key': 't9sk_test_29374df8-4462-4900-ad3a-145aa46fbfca',
  'host': 'localhost',
  'port': '5000',
  'protocol': 'http',
})

// create a contractor
ten99policy.contractors.create({
  company_name: "John & Friends",
  first_name: "John",
  last_name: "Doe",
  email: "example@gmail.com",
  phone: "415-111-1111",
  address:{
    line1: "2211 Mission St",
    line2: "",
    locality: "San Francisco,",
    region: "CA",
    postalcode: "94110"
  }
})
  .then(message => console.log(message))
  .catch(error => console.error(error));

// retrieve a job
ten99policy.contractors.retrieve("cn_pQ3qj5ADg7")
  .then(message => console.log(message))
  .catch(error => console.error(error));

// create a contractor
ten99policy.jobs.create({
  "name": "Truck driver",
  "description": "Requires a truck",
  "duration_hours": 20,
  "wage": 100,
  "years_experience": 20,
  "wage_type": "flatfee",
  "entity_id": "2",
  "category_code": "2"
})
  .then(message => console.log(message))
  .catch(error => console.error(error));

