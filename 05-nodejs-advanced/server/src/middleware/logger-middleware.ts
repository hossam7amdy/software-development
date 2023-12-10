import { RequestHandler } from 'express';

const removePaddingSpaces = (obj: Request): Request => {
  for (const key in obj) {
    if (typeof obj[key] !== 'string') continue;
    obj[key] = obj[key].trim();
  }

  return obj;
};

const loggerMiddleware: RequestHandler = (req, _, next) => {
  removePaddingSpaces(req.body);

  console.log({
    method: req.method,
    path: req.path,
    body: Object.keys(req.body).length ? req.body : undefined,
  });
  next();
};

export default loggerMiddleware;
