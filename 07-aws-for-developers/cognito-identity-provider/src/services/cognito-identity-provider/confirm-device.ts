import { ConfirmDeviceCommand } from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

type ConfirmDevice = {
  deviceKey: string;
  accessToken: string;
  passwordVerifier: string;
  salt: string;
};

const confirmDevice = ({ deviceKey, accessToken, passwordVerifier, salt }: ConfirmDevice) => {
  const command = new ConfirmDeviceCommand({
    DeviceKey: deviceKey,
    AccessToken: accessToken,
    DeviceSecretVerifierConfig: {
      PasswordVerifier: passwordVerifier,
      Salt: salt,
    },
  });

  return client.send(command);
};

export { confirmDevice };
