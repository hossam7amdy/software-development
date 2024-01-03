import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

type SignUpInput = {
  clientId: string;
  username: string;
  password: string;
  email: string;
};

const signUp = ({ clientId, username, password, email }: SignUpInput) => {
  const command = new SignUpCommand({
    ClientId: clientId,
    Username: username,
    Password: password,
    UserAttributes: [{ Name: 'email', Value: email }],
  });

  return client.send(command);
};

export { signUp };
