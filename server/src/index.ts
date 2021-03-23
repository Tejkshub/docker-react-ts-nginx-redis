import { app } from './app';
import { redisWrapper } from './connection/redis-wrapper';
import { prismaWrapper } from './connection/prisma-wrapper';

const start = async () => {
  if (!process.env.REDIS_HOST)
    throw new Error('REDIS_HOST must be defined');
  if (!process.env.REDIS_PORT)
    throw new Error('REDIS_PORT must be defined');

  try {
    await redisWrapper.connect(
      process.env.REDIS_HOST,
      Number(process.env.REDIS_PORT),
    );

    process.on('SIGINT', () => redisWrapper.client.quit());
    process.on('SIGNTERM', () => redisWrapper.client.quit());

    prismaWrapper.create();
  } catch (err) {
    console.error(err);
  }
};

app.listen(5000);

start();
