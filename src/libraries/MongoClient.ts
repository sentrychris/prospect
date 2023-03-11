import { Collection, MongoClient as Client } from 'mongodb';
import type { MongoConnection } from '../interfaces/Connection';

export enum MongoCollectionKey  {
  Device = 'devices',
  Software = 'software',
}

export class MongoClient implements MongoConnection<Collection> {
  protected client: Client;
    
  constructor(
    public readonly cluster: string,
    public readonly username: string,
    public readonly password: string,
    public readonly database: string
  ) {
    this.client = new Client(
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