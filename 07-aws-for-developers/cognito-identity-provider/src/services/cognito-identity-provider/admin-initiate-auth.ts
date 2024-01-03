import { AdminInitiateAuthCommand, AuthFlowType } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const adminInitiateAuth = ({
  username,
  password,
  clientId,
  userPoolId,
}: {
  username: string;
  password: string;
  clientId: string;
  userPoolId: string;
}) => {
  const command = new AdminInitiateAuthCommand({
    ClientId: clientId,
    UserPoolId: userPoolId,
    AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
    AuthParameters: { USERNAME: username, PASSWORD: password },
  });

  return client.send(command);
};

export { adminInitiateAuth };
