import type { ControllerOptions, Maker } from '../../interfaces/Generator';
import { Generator } from './Generator';

export class MakeController extends Generator implements Maker
{ 
  async fill(content?: string): Promise<string> {
    this.content = content ? content : this.content;

    if (!this.content) {
      throw new Error('No content');
    }
    
    this.content = await this.definition(this.content);
    
    return this.content;
  }

  async definition(content: string): Promise<string> {
    const options = <ControllerOptions>this.options;

    const stubReplacements = {
      CONTROLLER: options.controller,
      RESOURCE: options.resource,
      REPOSITORY: options.repository 
    };
    
    for (const [key, value] of Object.entries(stubReplacements)) {
      content = this.replaceToken(content, `%%${key}%%`, value);
    }
    
    return content;
  }
}