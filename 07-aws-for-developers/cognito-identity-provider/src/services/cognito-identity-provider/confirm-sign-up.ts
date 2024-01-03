import { ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

type ConfirmSignUp = {
  clientId: string;
  username: string;
  code: string;
};

const confirmSignUp = ({ clientId, username, code }: ConfirmSignUp) => {
  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: username,
    ConfirmationCode: code,
  });

  return client.send(command);
};

export { confirmSignUp };
