import type { Request } from 'express';
import type { Document } from 'mongodb';
import type { MongoRepository } from '../interfaces/Repository';
import type { Profile, ProfileProjection } from '../interfaces/Profile';
import { MongoCollectionKey } from '../libraries/MongoClient';
import { BaseRepository } from './BaseRepository';
import { PaginatedRequest } from '../libraries/PaginatedRequest';
import { mongoClient } from '../database';

export class ProfileRepository extends BaseRepository implements MongoRepository<Profile>
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
    const collection = await mongoClient.getCollection(MongoCollectionKey.Device);
      
    return await collection.findOne({
      'hwid': req.params.id
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
    
    this.collection.push(await new PaginatedRequest<ProfileProjection>(
      // collection
      await mongoClient.getCollection(MongoCollectionKey.Device),
      
      // aggregation
      [
        { $match: req.$match },
        { $sort: { 'record.lastSeen': -1 } }
      ],
      
      // projection
      {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
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
    const collection = await mongoClient.getCollection(MongoCollectionKey.Device);
    
    const device = await collection.findOne({
      'hwid': new RegExp(<string>profile.hwid, 'i')
    });

    profile.last_seen = new Date;

    device
      ? await collection.updateOne({ 'hwid': profile.hwid }, { $set: profile })
      : await collection.insertOne(profile);
    
    this.collection.push(profile);
    
    return this.collection;
  }
}