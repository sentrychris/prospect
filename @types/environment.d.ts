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
        }
    }
}

export {};
