import express, { Request, Response } from 'express';
import { prismaWrapper } from '../connection/prisma-wrapper';
import { redisWrapper } from '../connection/redis-wrapper';

const router = express.Router();

router
  .route('/values/all')
  .get(async (req: Request, res: Response) => {
    const values = await prismaWrapper.client.values.findMany();

    res.send(values);
  });

export { router as allValuesRouter };
