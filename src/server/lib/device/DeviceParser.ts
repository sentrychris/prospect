import type { Device } from '../../../shared/interfaces/resource/Device';
import { Parser } from '../../../shared/interfaces/Parser';
import { BaseParser } from '../BaseParser';

export class DeviceParser extends BaseParser implements Parser<DeviceParser, Device>
{ 
  /**
    * Fetch data
    * 
    * @param key
    */
  async fetchSource(key: string): Promise<DeviceParser> {
    const response = await fetch(`${this.url}/${key}`);
    this.source = await response.text();
        
    return this;
  }
    
  /**
    * Parse data
    * 
    * @returns 
    */
  async parseData(): Promise<Array<Device> | false> {
    return await this.parseHtmlTable(this.source, 'table.wikitable');
  }
}