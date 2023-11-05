declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';

            APP_URL: string;
            APP_PORT: string;
            APP_SECRET: string;
            
            MONGO_CLUSTER: string;
            MONGO_USER: string;
            MONGO_PASSWORD: string;
            MONGO_DATABASE: string;
            
            SQL_DIALECT: string;
            SQL_HOST: string;
            SQL_PORT: string;
            SQL_USERNAME: string;
            SQL_PASSWORD: string;
            SQL_DATABASE: string;

            // TTL for access requests
            ACCESS_TTL: string;

            // # Redis connection
            // # When using clustering, all values except the host are used as defaults for each node in the
            // # cluster, so each cluster runs locally on the same port, using the same authentication details.
            REDIS_HOST: string;
            REDIS_PORT: string;
            REDIS_USERNAME: string;
            REDIS_PASSWORD: string;
            REDIS_DATABASES: string;
            
            // # Redis TLS
            REDIS_TLS: string;
            REDIS_KEY: string;
            REDIS_CERT: string;

            // # 3 root notes should be enough to reliably connect and obtain cluster config from the server.
            // # There is no need to specify every node in the cluster.
            REDIS_CLUSTER_ROOT_0_HOST: string;
            REDIS_CLUSTER_ROOT_0_PORT: string;
            
            REDIS_CLUSTER_ROOT_1_HOST: string;
            REDIS_CLUSTER_ROOT_1_PORT: string;

            REDIS_CLUSTER_ROOT_2_HOST: string;
            REDIS_CLUSTER_ROOT_2_PORT: string;
        }
    }
}

export {};
