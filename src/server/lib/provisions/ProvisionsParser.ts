import type { Provisions } from '../../interfaces/dao/Provisions';
import { BaseParser } from '../BaseParser';

export class ProvisionsParser extends BaseParser
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
    async fetchSource(key: string): Promise<ProvisionsParser> {
        const response = await fetch(`${this.url}/${key}`);
        this.source = await response.text();
        
        return this;
    }
    
    /**
    * Parse data
    * 
    * @returns 
    */
    async parseData(): Promise<Array<Provisions> | false> {
        return await this.parseHtmlTable(this.source, 'table.wikitable');
    }
}

export const provisionsParser = new ProvisionsParser;