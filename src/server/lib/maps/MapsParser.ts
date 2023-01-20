import type { Map } from '../../../shared/interfaces/resource/Map';
import { Parser } from '../../../shared/interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class MapsParser extends BaseParser implements Parser<MapsParser, Map>
{   
    /**
    * Fetch data
    * 
    * @param key
    */
    async fetchSource(key: string): Promise<MapsParser> {
        const response = await fetch(`${this.url}/${key}`);
        this.source = await response.text();
        
        return this;
    }
    
    /**
    * Parse data
    * 
    * @returns 
    */
    async parseData(): Promise<Array<Map> | false> {
        return await this.parseHtmlTable(this.source, 'table.wikitable');
    }
}