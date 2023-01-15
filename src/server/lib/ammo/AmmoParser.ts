import { Ballistics } from '../../interfaces/Ballistics'
import { BaseParser } from '../BaseParser'

export class AmmoParser extends BaseParser
{
    /**
    * Source data
    */
    protected source: string | null = null
    
    /**
    * Fetch data
    * 
    * @param key
    */
    async fetchSource(key: string): Promise<AmmoParser> {
        const response = await fetch(`https://escapefromtarkov.fandom.com/wiki/${key}`)
        this.source = await response.text()
        
        return this
    }
    
    /**
    * Parse data
    * 
    * @returns 
    */
    async parseData(): Promise<Array<Ballistics> | false> {
        return await this.parseHtml(this.source)
    }
}

export const ammoParser = new AmmoParser