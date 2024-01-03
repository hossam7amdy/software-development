import {
  CreateUserPoolCommand,
  VerifiedAttributeType,
} from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const createUserPool = (poolName: string, configOverrides = {}) => {
  const command = new CreateUserPoolCommand({
    PoolName: poolName,
    AutoVerifiedAttributes: [VerifiedAttributeType.EMAIL],
    Schema: [{ Name: 'email', Required: true }],
    UsernameConfiguration: { CaseSensitive: false },
    ...configOverrides,
  });

  return client.send(command);
};

export { createUserPool };
