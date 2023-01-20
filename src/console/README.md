# Module Generator

Iceman comes with a handy module generator for quickly scaffolding server modules; server modules are encapsulated units of code for retrieving and storing API data.

> NOTE: You should take a look at the existing lib modules in `src/server/lib` before attempting to use this tool, you will need to understand how module code is structured and which imports are used.

To quickly scaffold a server module, just follow the steps below.

This example generates a module for retrieving and storing data on bosses from the Tarkov wiki

To generate the parser, for parsing data from the wiki page:

```
./cli.ts make:parser bosses --classname=BossesParser --resource=Boss
```

Output `src/server/lib/bosses/BossesParser.ts`:

```ts
import type { Boss } from '../../../shared/interfaces/resource/Boss';
import { Parser } from '../../../shared/interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class BossesParser extends BaseParser implements Parser<BossesParser, Boss>
{ 
  /**
    * Fetch data
    * 
    * @param key
    */
  async fetchSource(key: string): Promise<BossesParser> {
    const response = await fetch(`${this.url}/${key}`);
    this.source = await response.text();
        
    return this;
  }
    
  /**
    * Parse data
    * 
    * @returns 
    */
  async parseData(): Promise<Array<Boss> | false> {
    return await this.parseHtmlTable(this.source, 'table.wikitable');
  }
}
```

To generate the repository for working with the JSON and MongoDB data-stores:

```
./cli.ts make:repository bosses --classname=BossesRepository --key=BossesKey --collection=BossesCollection --resource=Boss --types=bossesTypes --parser=BossesParser
```

Output `src/server/lib/bosses/BossesRepository.ts`:

```ts
import type { Boss } from '../../../shared/interfaces/resource/Boss';
import type { BossesCollection  } from '../../../shared/types/collections';
import type { BossesKey } from '../../../shared/types/keys';
import { BossesParser } from './BossesParser';
import { bossesTypes } from '../../map/wiki/bosses';
import { client } from '../../database';
import { MongoCollectionKey } from '../../../shared/enums/collections';
import { BaseRepository } from '../BaseRepository';

export class BossesRepository extends BaseRepository<BossesParser, BossesKey, Boss, BossesCollection>
{
  /**
  * Store data to JSON file.
  * 
  * This method uses the parser to fetch data from the tarkov wiki
  * and return it in a JSON array for writing to files at the
  * designated storage path.
  * 
  * @param key 
  * @returns 
  */
  async storeToJsonFile(key: BossesKey) {
    return this.store('json', {
      key,
      types: bossesTypes,
      parser: new BossesParser
    });
  }
  
  /**
  * Store JSON file data to MongoDB.
  * 
  * This method is quite straight-forward, it just passes
  * the JSON file to insertMany to upload the JSON to the
  * designated collection.
  * 
  * @param key
  * @returns 
  */
  async storeJsonFileToMongoDb(key: string, type: string) {
    try {
      const data = await this.readJsonFile(key, type);
      const collection = await client.getCollection(MongoCollectionKey.Boss);
      const response = await collection.insertMany(data);
      
      return response;
    } catch (error) {
      console.log(error);
    }
    
    return [];
  }
}
```

To generate the importer which will be exposed through an endpoint served by the import controller:

```
./cli.ts make:importer bosses --classname=BossesImporter --key=BossesKey --collection=BossesCollection --types=bossesTypes --repository=BossesRepository
```

Output `src/server/lib/bosses/BossesImporter.ts`:

```ts
import type { Importer } from '../../../shared/interfaces/Importer';
import type { BossesKey } from '../../../shared/types/keys';
import type { BossesCollection } from '../../../shared/types/collections';
import { bossesTypes } from '../../map/wiki/bosses';
import { BossesRepository } from './BossesRepository';

export class BossesImporter implements Importer<BossesKey, BossesCollection>
{
  /**
  * Repository to access data storage.
  */
  public repository = new BossesRepository;
  
  /**
  * Import to JSON files.
  */
  async json() {            
    this.repository.clearCollection();
    
    for (const key of Object.keys(bossesTypes)) {
      await this.repository.storeToJsonFile(<BossesKey>key);
    }
    
    return this.repository.collection;
  }
  
  /**
  * Import to MongoDB
  */
  async mongo() {
    this.repository.clearCollection();
    
    for (const key of Object.keys(bossesTypes)) {
      for (const obj of bossesTypes[<BossesKey>key]) {
        await this.repository.storeJsonFileToMongoDb(key, obj);
      }
    }
    
    return this.repository.collection;
  }
}
```