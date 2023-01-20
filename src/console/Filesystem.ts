import * as fs from 'fs'
import * as path from 'path'

export const __dirname = path.resolve(path.dirname(''))

export async function readStub(type: string): Promise<string> {
    const filepath = path.join(__dirname, `src/console/stubs/${type}.txt`)
    const content = fs.readFileSync(filepath, {
        encoding: 'utf-8'
    })

    console.info(`Read stub from ${filepath}`)

    return content
}

export async function saveToFile(content: string, args: Record<string, string>, options: any): Promise<string> {
    const { type } = args
    const fullpath = path.resolve(__dirname)
    const delimiter = fullpath.includes('\\') ? '\\' : '/'
    const rootpath = fullpath.substring(0, fullpath.lastIndexOf(delimiter))
    const filepath = path.join(rootpath, ['iceman-dev', 'test', options.classname].join(delimiter))

    fs.writeFileSync(`${filepath}.ts`, content)

    console.info(`Saved file to ${filepath}`)

    return filepath
}