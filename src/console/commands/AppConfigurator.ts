import { generateRandomString } from '../../utilities';
import { Filesystem } from '../Filesystem';

export class AppConfigurator
{
  private envFile: string;

  private fs: Filesystem = new Filesystem;

  constructor() {
    this.envFile = this.fs.resolve('./.env');
  }

  setAppDevelopmentPort(port: string | number) {
    this.fs.replace({
      file: this.envFile,
      replace: /APP_PORT\s*=\s*([\S]+)/,
      content: `APP_PORT=${port}`,
      message: `API will listen on port ${port}`
    });
  }

  setAppSecret() {
    const secret = `x0${generateRandomString(22)}`;
    this.fs.replace({
      file: this.envFile,
      replace: /APP_SECRET\s*=\s*([\S]+)/,
      content: `APP_SECRET=${secret}`,
      message: `Access token generated: ${this.encodeString(secret)}`
    });
  }

  private encodeString(str: string) {
    const buffer = Buffer.from(str);
    return buffer.toString('base64');
  }
}