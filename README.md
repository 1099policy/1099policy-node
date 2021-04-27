# 1099Policy Node.js Library

Node.js client library for 1099Policy platform.

## Requirements

Node 8, 10 or higher.

## Installation

Install the package with:

```sh
soon
```

## Usage

The package needs to be configured with your account's secret key, which is
available in the [1099Policy Dashboard][api-keys]. Require it with the key's
value:

<!-- prettier-ignore -->
```js
const T99P = require('ten99policy');
const ten99policy = new T99P({
  'key': 't9sk_test_...',
})

// create a job
ten99policy.jobs.create({
  email: 'customer@example.com',
})
  .then(message => console.log(message))
  .catch(error => console.error(error));

// retrieve a job
ten99policy.jobs.retrieve([JOB_ID])
  .then(message => console.log(message))
  .catch(error => console.error(error));
```

[api-keys]: https://dashboard.1099policy.com/account/apikeys
