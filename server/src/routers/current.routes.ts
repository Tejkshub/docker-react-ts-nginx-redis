import express, { Request, Response } from 'express';
import { prismaWrapper } from '../connection/prisma-wrapper';
import { redisWrapper } from '../connection/redis-wrapper';

const router = express.Router();

router.route('/values/current').get((req: Request, res: Response) => {
  redisWrapper.publisher.hgetall('values', (err, values) => {
    res.send(values);
  });
});

export { router as currentValuesRouter };
