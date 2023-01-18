import type { Provisions } from '../../../shared/interfaces/resource/Provisions';
import { Parser } from '../../../shared/interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class ProvisionsParser extends BaseParser implements Parser<ProvisionsParser, Provisions>
{
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