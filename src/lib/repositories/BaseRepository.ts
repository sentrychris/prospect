import type { Document } from 'mongodb';
import { settings } from '../../config';

export class BaseRepository
{  
  private _path: string = settings.app.path;
  
  public collection: Document[] = [];
  
  get path() {
    return this._path;
  }
  
  set path(path: string) {
    this.path = path;
  }
      
  async clearCollection() {
    this.collection = [];
  }
}