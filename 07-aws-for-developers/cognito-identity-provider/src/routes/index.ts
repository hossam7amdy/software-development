import express from 'express';

import { adminInitiateAuthHandler } from '../controller/user-handlers/admin-initiate-auth-handler';
import { errHandler } from '../middleware/error-middleware';

const router = express.Router();

router.post('/auth/login', errHandler(adminInitiateAuthHandler));

export { router };
