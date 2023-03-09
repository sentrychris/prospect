import type { Repository } from '../interfaces/Repository';
import { settings } from '../config';

export class BaseRepository<T> implements Repository<T>
{  
  private _path: string = settings.app.storage;
  
  public collection: Array<T> = [];
  
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