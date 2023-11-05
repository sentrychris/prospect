import type { Request } from 'express';
import type { Document } from 'mongodb';
import type {
  Profile,
  ProfileDocument,
  ProfileProjection
} from '../interfaces/Profile';
import { MongoCollectionKey } from '../libraries/Mongo';
import { DataService } from './DataService';
import { Paginator } from '../libraries/Paginator';
import { mongo } from '../database';

export class ProfileService extends DataService
{
  /**
   * Default projection
   */
  private projection: ProfileProjection = {
    _id: 1, hwid: 1, hostname: 1, os: 1, software: 1, hardware: 1, last_seen: 1
  };

  /**
   * Fetch document
   * 
   * @param req 
   * @returns 
   */
  async get(req: Request) {
    const collection = await mongo.getCollection(MongoCollectionKey.Device);
      
    return await collection.findOne({ hwid: req.params.id }, {
      sort: { last_seen: -1 }
    });
  }

  /**
   * Fetch collection
   * 
   * @param req 
   * @returns 
   */
  async search(req: Request): Promise<Document[]> {
    this.clearCollection();
    
    this.collection.push(await new Paginator<ProfileProjection, ProfileDocument>(
      // collection
      await mongo.getCollection(MongoCollectionKey.Device), 
      // aggregation
      [
        { $match: req.$match },
        { $sort: { last_seen: -1 } }
      ],
      // projection
      {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        url: '/profiles',
        project: this.projection
      }
    ).collect());
    
    return this.collection;
  }

  /**
  * Store document
  * 
  * @param key
  * @returns 
  */
  async store(req: Request) {
    this.clearCollection();

    const profile = <Profile>req.body;
    const collection = await mongo.getCollection(MongoCollectionKey.Device);
    
    profile.last_seen = new Date;

    await collection.insertOne(profile);
    
    this.collection.push(profile);
    
    return this.collection;
  }
}