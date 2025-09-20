# ten99policy Node.js Library

A Node.js library for interacting with the 1099Policy API.

![Maintainability](https://api.codeclimate.com/v1/badges/d26e14fc7a2a1fb19467/maintainability)
![Test Coverage](https://api.codeclimate.com/v1/badges/d26e14fc7a2a1fb19467/test_coverage)

## Overview

The `ten99policy` library provides a simple and intuitive way to integrate 1099Policy's services into your Node.js applications. It allows you to manage entities, contractors, jobs, policies, quotes, assignments, invoices, and insurance application sessions through the 1099Policy API.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Entities](#entities)
    - [Creating an Entity](#creating-an-entity)
    - [Updating an Entity](#updating-an-entity)
    - [Fetching the List of Entities](#fetching-the-list-of-entities)
    - [Retrieving an Entity](#retrieving-an-entity)
    - [Deleting an Entity](#deleting-an-entity)
  - [Contractors](#contractors)
    - [Creating a Contractor](#creating-a-contractor)
    - [Updating a Contractor](#updating-a-contractor)
    - [Fetching the List of Contractors](#fetching-the-list-of-contractors)
    - [Retrieving a Contractor](#retrieving-a-contractor)
    - [Deleting a Contractor](#deleting-a-contractor)
  - [Insurance Application Sessions](#insurance-application-sessions)
    - [Creating an Insurance Application Session](#creating-an-insurance-application-session)
    - [Updating a Session](#updating-a-session)
    - [Fetching the List of Insurance Application Sessions](#fetching-the-list-of-insurance-application-sessions)
    - [Retrieving an Insurance Application Session](#retrieving-an-insurance-application-session)
  - [Jobs](#jobs)
    - [Creating a Job](#creating-a-job)
    - [Updating a Job](#updating-a-job)
    - [Fetching the List of Jobs](#fetching-the-list-of-jobs)
    - [Retrieving a Job](#retrieving-a-job)
    - [Deleting a Job](#deleting-a-job)
  - [Policies](#policies)
    - [Creating a Policy](#creating-a-policy)
    - [Updating a Policy](#updating-a-policy)
    - [Fetching the List of Policies](#fetching-the-list-of-policies)
    - [Retrieving a Policy](#retrieving-a-policy)
    - [Deleting a Policy](#deleting-a-policy)
  - [Quotes](#quotes)
    - [Creating a Quote](#creating-a-quote)
    - [Updating a Quote](#updating-a-quote)
    - [Fetching the List of Quotes](#fetching-the-list-of-quotes)
    - [Retrieving a Quote](#retrieving-a-quote)
  - [Assignments](#assignments)
    - [Creating an Assignment](#creating-an-assignment)
    - [Updating an Assignment](#updating-an-assignment)
    - [Fetching the List of Assignments](#fetching-the-list-of-assignments)
    - [Retrieving an Assignment](#retrieving-an-assignment)
    - [Deleting an Assignment](#deleting-an-assignment)
  - [Invoices](#invoices)
    - [Creating an Invoice](#creating-an-invoice)
    - [Updating an Invoice](#updating-an-invoice)
    - [Fetching the List of Invoices](#fetching-the-list-of-invoices)
    - [Retrieving an Invoice](#retrieving-an-invoice)
    - [Deleting an Invoice](#deleting-an-invoice)
- [Error Handling](#error-handling)
- [Additional Resources](#additional-resources)
- [Support](#support)
- [License](#license)

## Installation

Install the package using `npm`:

```bash
npm install ten99policy
```

## Configuration

Before using the library, configure it with your API credentials and settings.

```javascript
const Ten99Policy = require('ten99policy-node');

const ten99policy = new Ten99Policy({
  key: 'your_api_key_here',
  environment: 'production', // or 'sandbox' for testing
  logCurl: true, // Enable logging of CURL commands
});
```

**Configuration Parameters:**

- `key`: Your API key for authentication.
- `environment`: The API environment to use (`'production'` or `'sandbox'`).
- `logCurl`: Whether to log CURL commands for debugging (`true` or `false`).

## Usage

### Entities

#### Creating an Entity

```javascript
ten99policy.entities
  .create({
    name: 'Brooklyn Bowl',
    coverage_limit: {
      aggregate_limit: '200000000',
      occurrence_limit: '100000000',
    },
    address: {
      line1: '3639 18th St',
      locality: 'San Francisco',
      region: 'CA',
      postalcode: '94110',
    },
    required_coverage: ['general', 'workers-comp'],
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Updating an Entity

```javascript
ten99policy.entities
  .update('en_C9Z2DmfHSF', {
    name: 'California Roll',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Fetching the List of Entities

```javascript
ten99policy.entities
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Retrieving an Entity

```javascript
ten99policy.entities
  .retrieve('en_BUcNa8jMrq') // Replace with an existing entity ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Deleting an Entity

```javascript
ten99policy.entities
  .del('en_C9Z2DmfHSF') // Replace with an existing entity ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

---

### Contractors

#### Creating a Contractor

```javascript
ten99policy.contractors
  .create({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    phone: '415-111-1111',
    tax_identification: '123-456789',
    address: {
      country: 'USA',
      line1: '2211 Mission St',
      locality: 'San Francisco',
      region: 'CA',
      postalcode: '94110',
    },
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Updating a Contractor

```javascript
ten99policy.contractors
  .update('cn_tS3wR3UQ5q', { // Replace with an existing contractor ID
    email: 'john.doe@gmail.com',
    first_name: 'George',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Fetching the List of Contractors

```javascript
ten99policy.contractors
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Retrieving a Contractor

```javascript
ten99policy.contractors
  .retrieve('cn_9TPKz6B9so') // Replace with an existing contractor ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Deleting a Contractor

```javascript
ten99policy.contractors
  .del('cn_tS3wR3UQ5q') // Replace with an existing contractor ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

---

### Insurance Application Sessions

#### Creating an Insurance Application Session

```javascript
ten99policy.applicationSessions
  .create({
    quote: 'qt_yVEnbNaWh6',
    success_url: 'http://example.com/success',
    cancel_url: 'http://example.com/cancel',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Updating a Session

```javascript
ten99policy.applicationSessions
  .update('ias_01HZSB299T5D9SCNY98T8P10KC', { // Replace with an existing session ID
    success_url: 'http://example.com/success',
    cancel_url: 'http://example.com/cancel',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Fetching the List of Insurance Application Sessions

```javascript
ten99policy.applicationSessions
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Retrieving an Insurance Application Session

```javascript
ten99policy.applicationSessions
  .retrieve('ias_01HZSB299T5D9SCNY98T8P10KC') // Replace with an existing session ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

---

### Jobs

#### Creating a Job

```javascript
ten99policy.jobs
  .create({
    name: 'Truck driver',
    description: 'Requires a truck',
    duration_hours: 20,
    wage: 100,
    years_experience: 20,
    wage_type: 'flatfee',
    entity: 'en_FwZfQRe4aW',
    category_code: 'jc_MTqpkbkp6G',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Updating a Job

```javascript
ten99policy.jobs
  .update('jb_C9Z2DmfHSF', { // Replace with an existing job ID
    name: 'Mechanic',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Fetching the List of Jobs

```javascript
ten99policy.jobs
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Retrieving a Job

```javascript
ten99policy.jobs
  .retrieve('jb_C9Z2DmfHSF') // Replace with an existing job ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Deleting a Job

```javascript
ten99policy.jobs
  .del('jb_C9Z2DmfHSF') // Replace with an existing job ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

---

### Policies

#### Creating a Policy

```javascript
ten99policy.policies
  .create({
    quote_id: 'qt_UPmEfS6nNK',
    is_active: true,
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Updating a Policy

```javascript
ten99policy.policies
  .update('po_C9Z2DmfHSF', { // Replace with an existing policy ID
    is_active: false,
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Fetching the List of Policies

```javascript
ten99policy.policies
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Retrieving a Policy

```javascript
ten99policy.policies
  .retrieve('po_C9Z2DmfHSF') // Replace with an existing policy ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Deleting a Policy

```javascript
ten99policy.policies
  .del('po_C9Z2DmfHSF') // Replace with an existing policy ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

---

### Quotes

#### Creating a Quote

```javascript
ten99policy.quotes
  .create({
    job: 'jb_jsb9KEcTpc',
    contractor: 'cn_yJBbMeq9QA',
    coverage_type: ['general', 'workers-comp'],
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Updating a Quote

```javascript
ten99policy.quotes
  .update('qt_C9Z2DmfHSF', { // Replace with an existing quote ID
    name: 'Mechanic',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Fetching the List of Quotes

```javascript
ten99policy.quotes
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Retrieving a Quote

```javascript
ten99policy.quotes
  .retrieve('qt_C9Z2DmfHSF') // Replace with an existing quote ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

---

### Assignments

#### Creating an Assignment

```javascript
ten99policy.assignments
  .create({
    contractor: 'cn_kjLKMtApTv',
    job: 'jb_D6ZSaoa2MV',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Updating an Assignment

```javascript
ten99policy.assignments
  .update('an_sF3yUB3BYY', { // Replace with an existing assignment ID
    contractor: 'cn_kjLKMtApTv',
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Fetching the List of Assignments

```javascript
ten99policy.assignments
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Retrieving an Assignment

```javascript
ten99policy.assignments
  .retrieve('as_sF3yUB3BYY') // Replace with an existing assignment ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Deleting an Assignment

```javascript
ten99policy.assignments
  .del('as_xyz') // Replace with an existing assignment ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

---

### Invoices

#### Creating an Invoice

```javascript
ten99policy.invoices
  .create({
    contractor: 'cn_AWcQPecvx5',
    job: 'jb_jW24jp6GYb',
    gross_pay: 1000,
    paycycle_startdate: 1725494400, // Unix timestamp
    paycycle_enddate: 1735494400,   // Unix timestamp
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Updating an Invoice

```javascript
ten99policy.invoices
  .update('in_m47rNFQ3PS', { // Replace with an existing invoice ID
    gross_pay: 1500,
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Fetching the List of Invoices

```javascript
ten99policy.invoices
  .list()
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Retrieving an Invoice

```javascript
ten99policy.invoices
  .retrieve('in_m47rNFQ3PS') // Replace with an existing invoice ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### Deleting an Invoice

```javascript
ten99policy.invoices
  .del('in_m47rNFQ3PS') // Replace with an existing invoice ID
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

---

## Error Handling

The `ten99policy-node` library uses a promise-based structure and provides specific error classes for handling different error types. Handle potential errors using `.catch()` blocks and by checking the instance of the error.

```javascript
const { InvalidInputError, GeneralError } = require('ten99policy-node');

// Example of handling errors when creating an entity
ten99policy.entities
  .create({
    name: 'New Entity',
    // ... other parameters
  })
  .then((response) => console.log(response))
  .catch((error) => {
    if (error instanceof InvalidInputError) {
      console.error('Invalid input provided:', error.message);
    } else if (error instanceof GeneralError) {
      console.error('A general error occurred:', error.message);
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
  });
```

## Additional Resources

- **1099Policy Website**: [https://www.1099policy.com](https://www.1099policy.com)
- **API Documentation**: [https://www.1099policy.com/docs](https://www.1099policy.com/docs)
- **Developer Guide**: [https://docs.1099policy.com](https://docs.1099policy.com)

## Support

If you encounter any issues or have questions about using the `ten99policy-node` library, please open an issue on the [GitHub repository](https://github.com/1099policy/1099policy-node/issues) or contact our support team at [support@1099policy.com](mailto:support@1099policy.com).

## License

This library is distributed under the MIT License. See the [LICENSE](https://github.com/1099policy/1099policy-node/blob/main/LICENSE) file in the repository for more information.

---

*Note: Replace placeholder IDs (e.g., `"en_C9Z2DmfHSF"`) with actual IDs from your 1099Policy account when running the code examples.*
