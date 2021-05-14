# 1099Policy Node.js Library

[![Coverage Status](https://coveralls.io/repos/github/1099policy/ten99policy-node/badge.svg?branch=structuring-tests)](https://coveralls.io/github/1099policy/ten99policy-node?branch=structuring-tests)

Node.js client library for 1099Policy platform.

## Requirements

Node 8, 10 or higher.

## Installation

Install the package with:

```sh
npm install ten99policy
```

## Usage

To use the 1099Policy API you need to authenticate requests using API keys.
Sign up for a developer account to view and manage your API keys from the the 1099Policy Dashboard. [1099Policy Dashboard][register]

<!-- prettier-ignore -->
```js
const T99P = require('ten99policy');
const ten99policy = new T99P({
  'key': 't9sk_test_...',
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
```

[register]: https://dashboard.1099policy.com/register
