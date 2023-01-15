import { JSDOM } from 'jsdom'
import { deepCopy } from '../../utilities'
import { settings } from '../config'

export class BaseParser
{
    /**
     * Source url for data
     */
    public url: string = settings.app.sources.wiki

    /**
     * Parse HTML.
     * 
     * @param html
     * @returns 
     */
    async parseHtmlTable(html: string | null, selector: string)
    {
        if (!html) {
            return false
        }
        
        const dom = new JSDOM(html, {
            contentType: 'text/html'
        })
        
        const document = dom.window.document
        const table = document.querySelector(selector)
        if (!table) {
            return false 
        }
        
        const rows = [...table.querySelectorAll('tr')]
        if (!rows) {
            return false
        }
        
        const row = rows.shift()
        if (!row) {
            return false
        }
        
        const headers = row.querySelectorAll('th')
        
        return rows.map(row => {
            const parse = (arr: Array<HTMLElement | NodeList>, passes: number) => {
                return arr.reduce<Record<string, string>>((acc, cell, i) => {
                    i = passes === 2 ? i+2 : i
                    const column = headers[i].textContent
                    if (column) {
                        const { textContent } = <HTMLElement>cell
                        if (textContent) {
                            acc[column.trim()] = textContent.trim()
                        }
                    }
                    
                    return acc
                }, {})
            }

            const dest = parse([...row.querySelectorAll('th')], 1)
            const source = parse([...row.querySelectorAll('td')], 2)

            return deepCopy(source, dest)
        })
    }
}