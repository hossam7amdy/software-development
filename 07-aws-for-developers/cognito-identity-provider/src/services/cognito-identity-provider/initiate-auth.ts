import { AuthFlowType, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const initiateAuth = ({
  username,
  password,
  clientId,
}: {
  username: string;
  password: string;
  clientId: string;
}) => {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: clientId,
  });

  return client.send(command);
};
export { initiateAuth };
