import type { Document } from 'mongodb';

export class BaseRepository
{   
  public collection: Document[] = [];
      
  async clearCollection() {
    this.collection = [];
  }
}