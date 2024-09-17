'use strict';
const { InvalidInputError, GeneralError } = require('../lib/errors'); // Import specific errors

/* -----------------------------------------------------------------------------------*/
/* Initialize Ten99Policy API client
/* -----------------------------------------------------------------------------------*/

const Ten99Policy = require('../lib/ten99policy.js');
const ten99policy = new Ten99Policy({
  key: 't9sk_test_c6a100e0-88b2-4548-a9ca-d4b681503946',
  environment: 'sandbox',
  logCurl: true,
});

/* -----------------------------------------------------------------------------------*/
/* Fetching the list of sessions
/* -----------------------------------------------------------------------------------*/

ten99policy.applicationSessions
  .list()
  .then((message) => console.log(message))
  .catch((error) => {
    if (error instanceof InvalidInputError) {
      console.error('Invalid input provided:', error.message);
    } else if (error instanceof GeneralError) {
      console.error('A general error occurred:', error.message);
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
  });

/* -----------------------------------------------------------------------------------*/
/* Retrieving a session (replace xxx with an existing session id)
/* -----------------------------------------------------------------------------------*/

ten99policy.applicationSessions
  .retrieve('ias_01J6Y1AYKH3PM2CTW82EKEXKDK')
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Creating a session
/* -----------------------------------------------------------------------------------*/

ten99policy.applicationSessions
  .create({
    quote: "qt_5mpAcLHoXp",
    success_url: "http://example.com/success",
    cancel_url: "http://example.com/cancel"
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

/* -----------------------------------------------------------------------------------*/
/* Updating a session (replace xxx with an existing session id)
/* -----------------------------------------------------------------------------------*/

ten99policy.applicationSessions
  .update('ias_01J6Y1AYKH3PM2CTW82EKEXKDK', {
    success_url: "http://example.com/success2",
  })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
