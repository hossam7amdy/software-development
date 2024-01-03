import {
  AdminRespondToAuthChallengeCommand,
  ChallengeNameType,
} from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

type AdminRespondToAuthChallenge = {
  userPoolId: string;
  clientId: string;
  username: string;
  totp: string;
  session: string;
};

const adminRespondToAuthChallenge = ({
  userPoolId,
  clientId,
  username,
  totp,
  session,
}: AdminRespondToAuthChallenge) => {
  const command = new AdminRespondToAuthChallengeCommand({
    ChallengeName: ChallengeNameType.SOFTWARE_TOKEN_MFA,
    ChallengeResponses: {
      SOFTWARE_TOKEN_MFA_CODE: totp,
      USERNAME: username,
    },
    ClientId: clientId,
    UserPoolId: userPoolId,
    Session: session,
  });

  return client.send(command);
};

export { adminRespondToAuthChallenge };
