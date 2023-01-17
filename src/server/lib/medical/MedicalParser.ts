import type { Medical } from '../../interfaces/dao/Medical';
import { Parser } from '../../interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class MedicalParser extends BaseParser implements Parser<MedicalParser, Medical>
{
    /**
    * Fetch data
    * 
    * @param key
    */
    async fetchSource(key: string): Promise<MedicalParser> {
        const response = await fetch(`${this.url}/${key}`);
        this.source = await response.text();
        
        return this;
    }
    
    /**
    * Parse data
    * 
    * @returns 
    */
    async parseData(): Promise<Array<Medical> | false> {
        return await this.parseHtmlTable(this.source, 'table.wikitable');
    }
}