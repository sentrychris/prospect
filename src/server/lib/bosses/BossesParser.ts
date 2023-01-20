import type { Boss } from '../../../shared/interfaces/resource/Boss';
import { Parser } from '../../../shared/interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class BossesParser extends BaseParser implements Parser<BossesParser, Boss>
{ 
  /**
    * Fetch data
    * 
    * @param key
    */
  async fetchSource(key: string): Promise<BossesParser> {
    const response = await fetch(`${this.url}/${key}`);
    this.source = await response.text();
        
    return this;
  }
    
  /**
    * Parse data
    * 
    * @returns 
    */
  async parseData(): Promise<Array<Boss> | false> {
    return await this.parseHtmlTable(this.source, 'table.wikitable', {
      passes: {
        source: 1,
        dest: 1
      }
    });
  }
}