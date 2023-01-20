import type { Test } from '../../../shared/interfaces/resource/Test';
import { Parser } from '../../../shared/interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class TestParser extends BaseParser implements Parser<TestParser, Test>
{ 
  /**
    * Fetch data
    * 
    * @param key
    */
  async fetchSource(key: string): Promise<TestParser> {
    const response = await fetch(`${this.url}/${key}`);
    this.source = await response.text();
        
    return this;
  }
    
  /**
    * Parse data
    * 
    * @returns 
    */
  async parseData(): Promise<Array<Test> | false> {
    return await this.parseHtmlTable(this.source, 'table.wikitable');
  }
}