import type { Repository } from '../interfaces/Repository';
import type { Document } from 'mongodb';
import { settings } from '../../config';

export class BaseRepository implements Repository
{  
  private _path: string = settings.app.base;
  
  public collection: Document[] = [];
  
  get path() {
    return this._path;
  }
  
  set path(path: string) {
    this.path = path;
  }
      
  /**
    * Clear collected data.
    * 
    * This is usually called before loops to clear any
    * existing collections.
    */
  async clearCollection() {
    this.collection = [];
  }
}