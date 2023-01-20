import type { DataAccessOptions } from './Options';
import { Generator } from './Generator';

export class BotModuleGenerator extends Generator
{ 
  async fill(type: string, content?: string): Promise<string> {
    this.content = content ? content : this.content;

    if (!this.content) {
      throw new Error('No content');
    }
    
    if (type === 'data-access') {
      this.content = await this.defineDataAccessModule(this.content);
    }
    
    return this.content;
  }

  async defineDataAccessModule(content: string): Promise<string> {
    const options = <DataAccessOptions>this.options;

    const stubReplacements = {
      CLASSNAME: options.classname,
      RESOURCE: options.resource,
      TITLE: options.title,
      EXPORT: options.export,
    };
    
    for (const [key, value] of Object.entries(stubReplacements)) {
      content = this.replaceToken(content, `%%${key}%%`, value);
    }
    
    return content;
  }
}