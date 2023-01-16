import { settings } from "../config";
import { Repository } from "../interfaces/Repository";

export class BaseRepository<T> //implements Repository<T>
{
  // private _collectionKey: string = 'default';

  // private _path: string = settings.app.storage;

  // public collection: Array<T> = [];

  // get path() {
  //   return this._path;
  // }

  // set path(path: string) {
  //   this.path = path;
  // }

  // get collectionKey() {
  //   return this._collectionKey
  // }

  // set collectionKey(key: string) {
  //   this._collectionKey = key
  // }

  // async storeToJsonFile(key: any, types: any, type: any, parser: any) {
  //   for (const type of types[key]) {
  //       const raw = await parser.fetchSource(type);
  //       const data = await raw.parseData();

  //       if (data && data instanceof Array<typeof type>) {
  //           await this.writeJsonFile(type , data);
  //           this.collection.push(data);
  //       }
  //   }

  //   return this.collection;
  // }
}