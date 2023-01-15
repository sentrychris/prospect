import type { Backpack } from '../../interfaces/dao/Backpack';
import { BaseParser } from '../BaseParser';

export class BackpacksParser extends BaseParser
{
    /**
    * Source data
    */
    protected source: string | null = null;
    
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

export const backpacksParser = new BackpacksParser;