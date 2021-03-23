import redis, { ClientOpts } from 'redis';

class RedisWrapper {
  protected _client?: redis.RedisClient;

  get client() {
    if (!this._client) {
      throw new Error('Connect to Redis client before geting data');
    }

    return this._client;
  }

  connect(
    host: ClientOpts['host'],
    port: ClientOpts['port'],
  ): Promise<void> {
    this._client = redis.createClient({
      host: host,
      port: port,
      retry_strategy: () => 1000,
    });

    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Redis connected');

        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const redisWrapper = new RedisWrapper();
