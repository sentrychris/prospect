import { Filesystem } from '../Filesystem';

export class Generator
{
  public args: Record<string, string>;
  
  public options: unknown;
  
  public content: string | null = null;

  private fs: Filesystem = new Filesystem;
  
  constructor(args: Record<string, string>, options: unknown) {
    this.args = args;
    
    if (this.args === undefined) {
      throw new Error('Exiting due to invalid arguments.');
    }
    
    this.options = options;
  }

  async stub(stub: string): Promise<string> {
    this.content = await this.fs.readStub(stub);
    
    return this.content;
  }

  async save(type: string, content: string): Promise<string> {
    this.content = content ? content : this.content;

    if (!this.content) {
      throw new Error('No content');
    }

    await this.fs.saveToFile(type, content, this.args, this.options);

    return this.content;
  }

  replaceToken(content: string, find: string, replace: string) {
    return content.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  escapeRegExp(content: string) {
    return content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
 
  clearContent(): void {
    this.content = null;
  }
}