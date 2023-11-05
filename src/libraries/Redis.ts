import { Cluster } from 'ioredis';
import { RedisClusterSettings } from '../interfaces/Settings';
import { settings } from '../config';

export enum RedisCacheKey  {
  Device = 'device:',
  Software = 'software:',
}

export class Redis
{
  public cluster: Cluster;

  public healthKey: string = 'prospect-health-check';

  public isConnected: boolean = false;

  constructor() {
    const { cluster } = settings.redis;
    this.cluster = new Cluster(cluster.rootNodes, {
      enableReadyCheck: true,
      dnsLookup: (address, callback) => callback(null, address),
      // redisOptions: cluster.defaults
    });

    this.cluster.on('ready', () => {
      console.log('Redis connection established, ready to receive commands');
      this.isConnected = true;
    });

    this.cluster.on('error', (error) => {
      console.log(`Redis connection error, status is ${this.cluster.status}`);
      console.log(error.message);
    });

    this.cluster.on('close', () => {
      console.log('Redis connection closed');
      this.isConnected = false;
    });

    this.cluster.on('reconnecting', () => {
      console.log('Reconnecting to redis cluster...');
    });
  }

  keyAllowed(key: string) {
    return (key !== this.healthKey);
  }
}