import {
  ChallengeNameType,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { client } from './client';

type RespondToAuthChallenge = {
  clientId: string;
  username: string;
  session: string;
  code: string;
};
const respondToAuthChallenge = ({ clientId, username, session, code }: RespondToAuthChallenge) => {
  const command = new RespondToAuthChallengeCommand({
    ChallengeName: ChallengeNameType.SOFTWARE_TOKEN_MFA,
    ChallengeResponses: {
      SOFTWARE_TOKEN_MFA_CODE: code,
      USERNAME: username,
    },
    ClientId: clientId,
    Session: session,
  });

  return client.send(command);
};

export { respondToAuthChallenge };
