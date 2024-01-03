import { VerifySoftwareTokenCommand } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

// The 'Session' is provided in the response to 'AssociateSoftwareToken'.
const verifySoftwareToken = (totp: string, session: string) => {
  const command = new VerifySoftwareTokenCommand({
    Session: session,
    UserCode: totp,
  });

  return client.send(command);
};

export { verifySoftwareToken };
