import type { Armor } from '../../interfaces/dao/Armor';
import { Parser } from '../../interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class ArmorParser extends BaseParser implements Parser<ArmorParser, Armor>
{   
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