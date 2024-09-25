# 1099policy-node

A Node.js library for interacting with the 1099Policy API.

## Overview

This library provides a simple way to integrate 1099Policy's services into your Node.js applications. It currently focuses on job category management, with potential for expansion to cover more API resources in the future.

## Installation

Install the package using npm:

```bash
npm install 1099policy-node
```

## Usage

First, import and initialize the 1099Policy client:

```javascript
const Ten99Policy = require('1099policy-node');

const client = new Ten99Policy({
  apiKey: 'your_api_key_here',
  environment: 'production' // or 'sandbox' for testing
});
```

## Features

The SDK provides access to various 1099Policy API endpoints, including:

- Application management
- Policy creation and management
- Contractor data handling
- Payment processing
- Document generation and retrieval

## Inputs

When using the SDK methods, you'll typically need to provide:

- **API Key**: Your unique identifier for authentication
- **Contractor Information**: Details about the independent contractor
- **Policy Details**: Specifics about the insurance policy
- **Application Data**: Information required for insurance applications

Example:

```javascript
const applicationData = {
  contractor: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    // ... other contractor details
  },
  policy: {
    type: 'general_liability',
    coverageAmount: 1000000,
    // ... other policy details
  },
  // ... additional application information
};

const result = await client.applications.create(applicationData);
```

## Outputs

The SDK methods typically return promises that resolve with response objects containing:

- **Status**: Success or failure of the operation
- **Data**: Requested information or confirmation of actions taken
- **Error Messages**: Detailed information if an operation fails

Example response:

```javascript
{
  status: 'success',
  data: {
    applicationId: '12345',
    status: 'pending',
    // ... other application details
  },
  message: 'Application created successfully'
}
```

## Error Handling

The SDK uses a promise-based structure. Handle potential errors using try/catch blocks:

```javascript
try {
  const result = await client.applications.create(applicationData);
  console.log('Application created:', result);
} catch (error) {
  console.error('Error creating application:', error.message);
}
```

## Documentation

For detailed information about available methods, request parameters, and response formats, please refer to:

- [1099Policy API Documentation](https://www.1099policy.com/docs)
- [1099Policy Developer Guide](https://docs.1099policy.com/)

## Support

If you encounter any issues or have questions about using the SDK, please [open an issue](https://github.com/1099policy/1099policy-node/issues) on our GitHub repository or contact our support team at support@1099policy.com.

## License

This SDK is distributed under the MIT License. See the LICENSE file in the repository for more information.
