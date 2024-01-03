import { AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const adminGetUser = ({ userPoolId, username }: { userPoolId: string; username: string }) => {
  const command = new AdminGetUserCommand({
    UserPoolId: userPoolId,
    Username: username,
  });

  return client.send(command);
};

export { adminGetUser };
