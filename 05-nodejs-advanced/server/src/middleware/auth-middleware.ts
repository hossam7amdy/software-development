import { JwtObject } from '@muskan/shared';
import { ERRORS } from '@muskan/shared';
import { RequestHandler } from 'express';
import { TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

import { db, getLocalSchema } from '../model';
import { verifyJwt } from '../services/jwt-token';
import { CustomError } from '../utils/error';

const authTokenMiddleware: RequestHandler = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(' ')[1];

  if (!token) {
    throw new CustomError(401, ERRORS.TOKEN_NOT_FOUND);
  }

  try {
    verifyJwt(token);
  } catch (e) {
    const verifyErr = e as VerifyErrors;
    if (verifyErr instanceof TokenExpiredError) {
      throw new CustomError(401, ERRORS.TOKEN_EXPIRED);
    }
    throw new CustomError(401, ERRORS.BAD_TOKEN);
  }

  next();
};

const authUserMiddleware: RequestHandler = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(' ')[1];

  if (!token) {
    throw new CustomError(401, ERRORS.TOKEN_NOT_FOUND);
  }

  const payload: JwtObject = verifyJwt(token);
  const user = await db.auth.findById(payload.authId);

  if (!user) {
    throw new CustomError(401, ERRORS.USER_HAS_BEEN_DELETED);
  }

  if (!user.organizationId && user.userType !== 'self-signed') {
    throw new CustomError(401, ERRORS.USER_DOES_NOT_BELONG_TO_ORG);
  }

  if (user.organizationId) {
    res.locals.organizationId = user.organizationId;
    res.locals.schema = getLocalSchema(user.organizationId);
  }

  next();
};

export { authTokenMiddleware, authUserMiddleware };
