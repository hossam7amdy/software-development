import {
  SetUserPoolMfaConfigCommand,
  UserPoolMfaType,
} from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

const setUserPoolMfaConfig = (poolId: string) => {
  const command = new SetUserPoolMfaConfigCommand({
    UserPoolId: poolId,
    MfaConfiguration: UserPoolMfaType.ON,
    SoftwareTokenMfaConfiguration: { Enabled: true },
  });

  return client.send(command);
};

export { setUserPoolMfaConfig };
