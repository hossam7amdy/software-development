import { NextFunction, Request, RequestHandler, Response } from 'express';

import { logger } from '../utils/util-log';

export function errHandler(fn: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}

export function errMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error(error);

  return res.status(500).send({
    message: 'Oops, an unexpected error occurred, please try again.',
  });
}
