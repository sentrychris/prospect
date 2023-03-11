import { readFile, readFileSync, writeFile, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';

export class Filesystem
{
  public dirname: string = resolve(dirname(''));

  public cwd: string = process.cwd();

  resolve(file: string) {
    return join(this.cwd, file);
  }

  replace({file, replace, content, message}: {file: string, replace: RegExp, content: string, message: string}) {
    readFile(file, 'utf-8', (error, data) => {
      if (error) {
        return false;
      }

      const str = data.replace(new RegExp(replace, 'g'), content);

      this.write(file, str, message);
    });
  }

  write(file: string, content: string, message: string) {
    writeFile(file, content, 'utf-8', (err) => {
      if (err) return console.log(err);
      console.info(message);
    });
  }

  async stub(type: string): Promise<string> {
    const filepath = join(__dirname, `../console/stubs/${type}.txt`);
    const content = readFileSync(filepath, {
      encoding: 'utf-8'
    });

    console.info(`Read stub from ${filepath}`);

    return content;
  }

  async save(type: string, content: string, filename: string): Promise<string> {
    const fullpath = resolve(__dirname + '../');
    const delimiter = fullpath.includes('\\') ? '\\' : '/';
    const rootpath = fullpath.substring(0, fullpath.lastIndexOf(delimiter));

    // TODO change this
    let dest = '';
    if (type === 'resource') {
      dest = 'interfaces';
    } else if (type === 'repository') {
      dest = 'repositories';
    } else {
      dest = 'controllers';
    }

    const destination = join(rootpath, [dest].join(delimiter));

    writeFileSync(`${destination}${delimiter}${filename}.ts`, content);

    console.info(`Saved file to ${destination}`);

    return destination;
  }
}