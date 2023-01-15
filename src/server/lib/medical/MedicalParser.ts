import type { Medical } from '../../interfaces/Medical';
import { BaseParser } from '../BaseParser';

export class MedicalParser extends BaseParser
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

export const medicalParser = new MedicalParser;