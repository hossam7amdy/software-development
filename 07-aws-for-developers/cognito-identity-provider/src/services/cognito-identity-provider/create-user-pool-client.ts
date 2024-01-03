import {
  CreateUserPoolClientCommand,
  ExplicitAuthFlowsType,
} from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const createUserPoolClient = (clientName: string, poolId: string) => {
  const command = new CreateUserPoolClientCommand({
    UserPoolId: poolId,
    ClientName: clientName,
    ExplicitAuthFlows: [
      ExplicitAuthFlowsType.ALLOW_ADMIN_USER_PASSWORD_AUTH,
      ExplicitAuthFlowsType.ALLOW_USER_PASSWORD_AUTH,
      ExplicitAuthFlowsType.ALLOW_REFRESH_TOKEN_AUTH,
    ],
  });

  return client.send(command);
};

export { createUserPoolClient };
