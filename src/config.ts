import { config } from 'dotenv';
import { Dialect } from 'sequelize';
import type { Settings } from './interfaces/Settings';
import type { RedisNodeAddress } from './interfaces/Connection';
import { APP_VERSION } from './version';

config({ debug: process.env.DEBUG ? true : false });

const redisClusterRootNodes: Array<RedisNodeAddress> = [];

const redisNodeSettings = {
  username: process.env.REDIS_USERNAME ?? '',
  password: process.env.REDIS_PASSWORD ?? '',
  db: parseInt(process.env.REDIS_DATABASES ?? '16'),
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
}

const pushClusterNode = ({host, port}: RedisNodeAddress) => {
  redisClusterRootNodes.push({ host, port });
}

pushClusterNode({
  host: process.env.REDIS_CLUSTER_ROOT_0_HOST ?? process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_CLUSTER_ROOT_0_PORT ?? process.env.REDIS_PORT)
});

for (let i = 1; i < 5; ++i) {
  const host = `REDIS_CLUSTER_ROOT_${i}_HOST`;
  if (process.env[host]) {
    const port = `REDIS_CLUSTER_ROOT_${i}_PORT`;
    pushClusterNode({
      host: <string>process.env[host],
      port: parseInt(process.env[port] ?? process.env.REDIS_PORT)
    });
  }
}

export const settings: Settings = {
  app: {
    url: process.env.APP_URL ?? '',
    port: process.env.APP_PORT ?? 3001,
    secret: process.env.APP_SECRET ?? '',
    path: '',
    version: APP_VERSION,
    sources: {},
    cacheTTL: 300,
  },
  mongo: {
    cluster: process.env.MONGO_CLUSTER ?? '',
    user: process.env.MONGO_USER ?? '',
    password: process.env.MONGO_PASSWORD ?? '',
    database: process.env.MONGO_DATABASE ?? ''
  },
  sql: {
    dialect: <unknown>process.env.SQL_DIALECT as Dialect ?? 'mariadb',
    host: process.env.SQL_HOST ?? '',
    port: parseInt(process.env.SQL_PORT ?? '3306'),
    username: process.env.SQL_USERNAME ?? '',
    password: process.env.SQL_PASSWORD ?? '',
    database: process.env.SQL_DATABASE ?? '',
    models: [__dirname + '/models']
  },
  redis: {
    cluster: {
      rootNodes: redisClusterRootNodes,
      defaults: redisNodeSettings
    }
  }
};

console.log('Settings configured', {
  name: 'Warden',
  url: settings.app.url,
  version: settings.app.version
});

console.log('Redis cluster nodes', settings.redis.cluster.rootNodes);