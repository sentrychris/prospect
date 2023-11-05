import type { Document } from 'mongodb';

export abstract class DataService
{   
  public collection: Document[] = [];
      
  async clearCollection() {
    this.collection = [];
  }
}