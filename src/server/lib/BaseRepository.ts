import { settings } from "../config";
import * as fs from 'fs';
import type { Repository } from "../interfaces/Repository";

export class BaseRepository<K, T, C> implements Repository<K, C>
{
  private _collectionKey: string = 'default';
  
  private _path: string = settings.app.storage;
  
  public collection: Array<any> = [];
  
  get path() {
    return this._path;
  }
  
  set path(path: string) {
    this.path = path;
  }
  
  get collectionKey() {
    return this._collectionKey
  }
  
  set collectionKey(key: string) {
    this._collectionKey = key
  }
  
  async store(type: string, {key, types, parser}: {key: K, types: Record<any, Array<string>>, parser: any}) {
    if (type === 'json') {
      for (const type of types[key]) {
        await parser.fetchSource(type);
        const data = await parser.parseData();
        
        if (data && data instanceof Array<T>) {
          await this.writeJsonFile(key, type, data);
          this.collection.push(data);
        }
      }
    }

    return this.collection;
  }
  
  /**
  * Write JSON file
  * 
  * @param key 
  * @param type
  * @param data 
  */
  async writeJsonFile(key: K, type: string, data: Array<T>) {
    const path = `${this.path}/${key}/`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true
      });
    }

    fs.writeFileSync(
      `${this.path}/${key}/${type}.json`,
      JSON.stringify(data, null, 4),
      { encoding: 'utf-8' }
    );
    
    return this;
  }
  
  /**
  * Read JSON file
  * 
  * @param key
  * @returns 
  */
  async readJsonFile(key: string) {
    const data = fs.readFileSync(`${this.path}/armor/${key}.json`, {
      encoding: 'utf-8',
    });
    
    return JSON.parse(data);
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