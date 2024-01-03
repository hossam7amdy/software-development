import { RequestHandler } from 'express';
import validator from 'validator';

import { adminInitiateAuth } from '../../services/cognito-identity-provider/admin-initiate-auth';
import { associateSoftwareToken } from '../../services/cognito-identity-provider/associate-software-token';
import { getCognitoClientId, getCognitoUserPoolId } from '../../utils/util-env';
import { logger } from '../../utils/util-log';

const handleMfaSetup = async (session: string, email: string) => {
  const { SecretCode, Session } = await associateSoftwareToken(session);

  return { otp: `otpauth://totp/${email}?secret=${SecretCode}`, session: Session };
};

const adminInitiateAuthHandler: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      return res.status(400).send({ message: 'Email and password must be provided.' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({ message: 'Invalid email address.' });
    }

    const clientId = getCognitoClientId();
    const userPoolId = getCognitoUserPoolId();
    const { ChallengeName, Session } = await adminInitiateAuth({
      username: email,
      password,
      userPoolId,
      clientId,
    });

    if (ChallengeName === 'SOFTWARE_TOKEN_MFA') {
      const { session, otp } = await handleMfaSetup(Session, email);
      return res.send({ ChallengeName, Session: session, otp });
    }

    return res.send({ ChallengeName, Session });
  } catch (err) {
    logger.warn(err);
    return res.status(400).send({ message: 'Incorrect email or password.' });
  }
};

export { adminInitiateAuthHandler };
