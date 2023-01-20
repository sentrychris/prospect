import * as fs from 'fs';
import * as path from 'path';

export class Filesystem
{
  public dirname: string = path.resolve(path.dirname(''));

  async readStub(type: string): Promise<string> {
    const filepath = path.join(__dirname, `../stubs/${type}.txt`);
    const content = fs.readFileSync(filepath, {
      encoding: 'utf-8'
    });

    console.info(`Read stub from ${filepath}`);

    return content;
  }

  async saveToFile(content: string, args: Record<string, string>, options: any): Promise<string> {
    const { module } = args;
    const fullpath = path.resolve(__dirname + '../../');
    const delimiter = fullpath.includes('\\') ? '\\' : '/';
    const rootpath = fullpath.substring(0, fullpath.lastIndexOf(delimiter));
    const filepath = path.join(rootpath, ['server', 'lib', module].join(delimiter));

    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath);
    }

    fs.writeFileSync(`${filepath}${delimiter}${options.classname}.ts`, content);

    console.info(`Saved file to ${filepath}`);

    return filepath;
  }
}