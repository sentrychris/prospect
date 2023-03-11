import * as fs from 'fs';
import * as path from 'path';

export class Filesystem
{
  public dirname: string = path.resolve(path.dirname(''));

  public cwd: string = process.cwd();

  resolve(file: string) {
    return path.join(this.cwd, file);
  }

  replace({file, replace, content, message}: {file: string, replace: RegExp, content: string, message: string}) {
    fs.readFile(file, 'utf-8', (error, data) => {
      if (error) {
        return false;
      }

      const str = data.replace(new RegExp(replace, 'g'), content);

      this.write(file, str, message);
    });
  }

  write(file: string, content: string, message: string) {
    fs.writeFile(file, content, 'utf-8', (err) => {
      if (err) return console.log(err);
      console.info(message);
    });
  }

  async stub(type: string): Promise<string> {
    const filepath = path.join(__dirname, `./stubs/${type}.txt`);
    const content = fs.readFileSync(filepath, {
      encoding: 'utf-8'
    });

    console.info(`Read stub from ${filepath}`);

    return content;
  }

  async save(type: string, content: string, filename: string): Promise<string> {
    const fullpath = path.resolve(__dirname + '../');
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

    const destination = path.join(rootpath, [dest].join(delimiter));

    fs.writeFileSync(`${destination}${delimiter}${filename}.ts`, content);

    console.info(`Saved file to ${destination}`);

    return destination;
  }
}