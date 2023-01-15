import type { Armor } from '../../interfaces/dao/Armor';
import { BaseParser } from '../BaseParser';

export class ArmorParser extends BaseParser
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
    async fetchSource(key: string): Promise<ArmorParser> {
        const response = await fetch(`${this.url}/${key}`);
        this.source = await response.text();
        
        return this;
    }
    
    /**
    * Parse data
    * 
    * @returns 
    */
    async parseData(): Promise<Array<Armor> | false> {
        return await this.parseHtmlTable(this.source, 'table.wikitable');
    }
}

export const armorParser = new ArmorParser;