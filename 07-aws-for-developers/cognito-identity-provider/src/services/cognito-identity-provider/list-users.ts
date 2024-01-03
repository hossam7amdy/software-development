import { ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const listUsers = (userPoolId: string) => {
  const command = new ListUsersCommand({
    UserPoolId: userPoolId,
  });

  return client.send(command);
};

export { listUsers };
