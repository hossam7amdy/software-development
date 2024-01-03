import { DeleteUserPoolCommand } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const deleteUserPool = (poolId: string) => {
  const command = new DeleteUserPoolCommand({
    UserPoolId: poolId,
  });

  return client.send(command);
};

export { deleteUserPool };
