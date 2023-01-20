import type { Quest } from '../../../shared/interfaces/resource/Quest';
import type { Parser } from '../../../shared/interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class QuestsParser extends BaseParser implements Parser<QuestsParser, Quest>
{
  /**
    * Fetch data
    * 
    * @param key
    */
  async fetchSource(key: string): Promise<QuestsParser> {
    const response = await fetch(`${this.url}/${key}`);
    this.source = await response.text();
        
    return this;
  }
    
  /**
    * Parse data
    * 
    * @returns 
    */
  async parseData(): Promise<Array<Quest> | false> {
    return await this.parseHtmlTable(this.source, 'table.wikitable');
  }
}