import { Collection, MongoClient as MongoConnection } from 'mongodb';
import type { Connection } from '../interfaces/Connection';

export class MongoClient implements Connection<Collection> {
    protected client: MongoConnection;
    
    constructor(
        public readonly cluster: string,
        public readonly username: string,
        public readonly password: string,
        public readonly database: string
    ) {
        this.client = new MongoConnection(
            `mongodb+srv://${username}:${encodeURIComponent(password)}@${cluster}/${database}?retryWrites=true&w=majority`
        );
    }
    
    async getCollection(collection: string) {
        await this.client.connect();
        return this.client.db().collection(collection);
    }
    
    async closeConnection() {
        this.client.close();
    }
}