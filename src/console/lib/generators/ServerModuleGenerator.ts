import type { ImporterOptions, ParserOptions, RepositoryOptions } from './GeneratorOptions';
import { Generator } from './Generator';

export class ServerModuleGenerator extends Generator
{ 
  async fill(type: string, content?: string): Promise<string> {
    this.content = content ? content : this.content;

    if (!this.content) {
      throw new Error('No content');
    }
    
    if (type === 'importer') {
      this.content = await this.defineLibImporterModule(this.content);
    }

    if (type === 'repository') {
      this.content = await this.defineLibRepositoryModule(this.content);
    }

    if (type === 'parser') {
      this.content = await this.defineLibParserModule(this.content);
    }
    
    return this.content;
  }

  async defineLibImporterModule(content: string): Promise<string> {
    const options = <ImporterOptions>this.options;

    const stubReplacements = {
      CLASSNAME: options.classname,
      KEY: options.key,
      COLLECTION: options.collection,
      TYPES: options.types,
      REPOSITORY: options.repository
    };
    
    for (const [key, value] of Object.entries(stubReplacements)) {
      content = this.replaceToken(content, `%%${key}%%`, value);
    }
    
    return content;
  }

  async defineLibRepositoryModule(content: string): Promise<string> {
    const options = <RepositoryOptions>this.options;

    const stubReplacements = {
      CLASSNAME: options.classname,
      KEY: options.key,
      COLLECTION: options.collection,
      RESOURCE: options.resource,
      TYPES: options.types,
      PARSER: options.parser
    };
    
    for (const [key, value] of Object.entries(stubReplacements)) {
      content = this.replaceToken(content, `%%${key}%%`, value);
    }
    
    return content;
  }

  async defineLibParserModule(content: string): Promise<string> {
    const options = <ParserOptions>this.options;

    const stubReplacements = {
      CLASSNAME: options.classname,
      RESOURCE: options.resource,
    };
    
    for (const [key, value] of Object.entries(stubReplacements)) {
      content = this.replaceToken(content, `%%${key}%%`, value);
    }
    
    return content;
  }
}