import { ResendConfirmationCodeCommand } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const resendConfirmationCode = ({ clientId, username }: { clientId: string; username: string }) => {
  const command = new ResendConfirmationCodeCommand({
    ClientId: clientId,
    Username: username,
  });

  return client.send(command);
};

export { resendConfirmationCode };
