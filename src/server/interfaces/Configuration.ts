export interface AppSetting {
    [key: string]: string
}

export interface AppSettings {
    url: string;
    secret: string;
    port: string | number;
    storage: string;
    sources: AppSetting;
}

export interface MongoSettings {
    cluster: string;
    user: string;
    password: string;
    database: string;
}

export interface Configuration {
    app: AppSettings;
    docs: {
        port: string | number;
        schema: string;
    };
    mongo: MongoSettings;
}