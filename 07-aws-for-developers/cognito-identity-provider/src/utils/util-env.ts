import dotenv from 'dotenv';

dotenv.config();

export const getCognitoUserPoolId = () => {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;

  if (!userPoolId) {
    throw new Error('Missing env variable <COGNITO_USER_POOL_ID>');
  }

  return userPoolId;
};

export const getCognitoClientId = () => {
  const clientId = process.env.COGNITO_CLIENT_ID;

  if (!clientId) {
    throw new Error('Missing env variable <COGNITO_CLIENT_ID>');
  }

  return clientId;
};
