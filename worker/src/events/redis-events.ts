import redis from 'redis';

export class RedisEvent {
  private _client: redis.RedisClient;
  private _sub: redis.RedisClient;

  constructor(client: redis.RedisClient) {
    this._client = client;
    this._sub = client.duplicate();
  }

  onMessage() {
    this._sub.on('message', (channel, message) => {
      const fib = (index: number): number => {
        if (index < 2) return 1;
        return fib(index - 1) + fib(index - 2);
      };

      this._client.hset(
        'values',
        message,
        fib(Number(message)).toString(),
      );
    });
  }

  onSubscribe() {
    this._sub.subscribe('insert');
  }
}
