import express, { Request, Response } from 'express';
import { prismaWrapper } from '../connection/prisma-wrapper';
import { redisWrapper } from '../connection/redis-wrapper';

const router = express.Router();

router
  .route('/values/create')
  .post(async (req: Request, res: Response) => {
    const { index } = req.body;

    if (parseInt(index) > 40) {
      return res.status(422).send('Index too high');
    }

    redisWrapper.client.hset('values', index, 'Nothing yet!');
    redisWrapper.publisher.publish('insert', index);

    const data = await prismaWrapper.client.values.create({
      data: {
        values: Number(index),
      },
    });

    res.status(201).send({ working: true });
  });

export { router as createValuesRouter };
