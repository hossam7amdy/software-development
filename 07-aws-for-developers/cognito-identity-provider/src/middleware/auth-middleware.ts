import { RequestHandler } from 'express';

const authTokenMiddleware: RequestHandler = async (req, _, next) => {
  next();
};

const authUserMiddleware: RequestHandler = async (req, res, next) => {
  next();
};

export { authTokenMiddleware, authUserMiddleware };
