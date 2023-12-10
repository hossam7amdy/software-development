import crypto from 'crypto';

import { getSalt } from './env';

const encryptPassword = (password: string): string => {
  return crypto.pbkdf2Sync(password, getSalt(), 64, 128, 'sha512').toString('hex');
};

export { encryptPassword };
