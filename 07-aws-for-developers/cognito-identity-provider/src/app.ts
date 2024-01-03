import cors from 'cors';
import express from 'express';

import { errMiddleware } from './middleware/error-middleware';
import { loggerMiddleware } from './middleware/logger-middleware';
import { router } from './routes';

const app = express();

app.use(cors({ origin: ['*'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);

app.get('/healthz', (_req, res) => res.sendStatus(200));
app.use('/api/v1', router);

app.use(errMiddleware);

export { app };
