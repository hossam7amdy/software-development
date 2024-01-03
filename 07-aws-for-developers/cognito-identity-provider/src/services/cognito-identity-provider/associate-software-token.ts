import { AssociateSoftwareTokenCommand } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const associateSoftwareToken = (session: string) => {
  const command = new AssociateSoftwareTokenCommand({
    Session: session,
  });

  return client.send(command);
};

export { associateSoftwareToken };
