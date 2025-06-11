const message = {
  //* Token Messages
  TOKEN_REQUIRED: 'Token required',
  INVALID_TOKEN: 'Invalid token',
  UNAUTHORIZED: 'Unauthorized',
  DUPLICATE_KEY: 'Duplicate entry',
  USER_ID_REQUIRED: 'User id required',

  //* Common Messages
  SUCCESS: 'Success',
  FAILED: 'Failed',
  NOT_FOUND: 'Not found',
  ALREADY_EXIST: 'Already exist',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  AUTHORIZATION_TOKEN_MISSING_BEARER:
    'Authorization header is not valid. Missing Bearer keyword.',

  //* User Service Messages
  US_SOMETHING_WENT_WRONG: 'Something went wrong in user service',
  USER_NOT_FOUND: 'User not found',
  USER_NOT_ACTIVE: 'User is not active',
  ACCESS_DENIED: 'Access denied',
  ERROR_UPDATING_USER_ACCOUNT_STATUS: 'Error updating user account status',
};

export default message;
