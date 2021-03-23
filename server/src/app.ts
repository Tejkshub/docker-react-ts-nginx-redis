import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import { allValuesRouter } from './routers/all.routes';
import { createValuesRouter } from './routers/create.routes';
import { currentValuesRouter } from './routers/current.routes';

const app = express();
app.use(cors());
app.use(json());

app.use(allValuesRouter);
app.use(createValuesRouter);
app.use(currentValuesRouter);

export { app };
