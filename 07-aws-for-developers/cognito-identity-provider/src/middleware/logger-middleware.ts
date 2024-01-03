import { RequestHandler } from 'express';

import { logger } from '../utils/util-log';

// parse body and hide password
const parseBody = (body: any) => {
  const ObjectKeys = Object.keys(body);

  // replace any key that contains password with '***'
  ObjectKeys.forEach(key => {
    if (key.toLowerCase().includes('password')) {
      body[key] = '***';
    }
  });

  return body;
};

export const loggerMiddleware: RequestHandler = (req, _, next) => {
  // get body from request and make a copy
  const body = { ...req.body };

  logger.info(
    JSON.stringify({
      method: req.method,
      path: req.path,
      body: Object.keys(body).length ? parseBody(body) : undefined,
      query: Object.keys(req.query).length ? req.query : undefined,
    })
  );

  return next();
};
