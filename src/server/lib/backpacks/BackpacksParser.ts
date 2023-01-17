import type { Backpack } from '../../interfaces/dao/Backpack';
import { Parser } from '../../interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class BackpacksParser extends BaseParser implements Parser<BackpacksParser, Backpack>
{   
    /**
    * Fetch data
    * 
    * @param key
    */
    async fetchSource(key: string): Promise<BackpacksParser> {
        const response = await fetch(`${this.url}/${key}`);
        this.source = await response.text();
        
        return this;
    }
    
    /**
    * Parse data
    * 
    * @returns 
    */
    async parseData(): Promise<Array<Backpack> | false> {
        return await this.parseHtmlTable(this.source, 'table.wikitable');
    }
}