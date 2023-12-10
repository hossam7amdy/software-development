import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

import { CustomError } from '../utils/error';
import { removeLocalFiles } from '../utils/remove-local-files';

function errHandler(fn: any) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}

function errMiddleware(error: Error, req: Request, res: Response, _next: NextFunction) {
  const file = req.file as Express.Multer.File;
  const files = req.files as Express.Multer.File[];

  if (file) removeLocalFiles([file]);
  if (files) removeLocalFiles(files);

  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).send({ message: error.message });
  }

  console.error('Uncaught exception:', error);

  return res.status(500).send({
    message: 'Oops, an unexpected error occurred, please try again.',
  });
}

export { errHandler, errMiddleware };
