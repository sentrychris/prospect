import type { Document } from 'mongodb';

export abstract class BaseRepository
{   
  public collection: Document[] = [];
      
  async clearCollection() {
    this.collection = [];
  }
}