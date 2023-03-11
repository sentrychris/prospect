import type { Maker, RepositoryOptions } from '../../interfaces/Generation';
import { Generator } from './Generator';

export class MakeRepository extends Generator implements Maker
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
    const options = <RepositoryOptions>this.options;

    const stubReplacements = {
      REPOSITORY: options.repository,
      RESOURCE: options.resource
    };
    
    for (const [key, value] of Object.entries(stubReplacements)) {
      content = this.replaceToken(content, `%%${key}%%`, value);
    }
    
    return content;
  }
}