import type { ImporterOptions, ParserOptions, RepositoryOptions } from './Options';
import { readStub, saveToFile } from './Filesystem';

export class Generator
{
  private args: Record<string, string>
  
  private options: unknown
  
  private content: string | null = null
  
  constructor(args: Record<string, string>, options: unknown) {
    this.args = args
    
    if (this.args === undefined) {
      throw new Error('Exiting due to invalid arguments.')
    }
    
    this.options = options
  }

  async defineLibImporterModule(content: string): Promise<string> {
    const options = <ImporterOptions>this.options;

    const stubReplacements = {
      CLASSNAME: options.classname,
      KEY: options.key,
      COLLECTION: options.collection,
      TYPES: options.types,
      REPOSITORY: options.repository
    }
    
    for (const [key, value] of Object.entries(stubReplacements)) {
      content = this.replaceToken(content, `%%${key}%%`, value)
    }
    
    return content
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
    }
    
    for (const [key, value] of Object.entries(stubReplacements)) {
      content = this.replaceToken(content, `%%${key}%%`, value)
    }
    
    return content
  }

  async defineLibParserModule(content: string): Promise<string> {
    const options = <ParserOptions>this.options;

    const stubReplacements = {
      CLASSNAME: options.classname,
      RESOURCE: options.resource,
    }
    
    for (const [key, value] of Object.entries(stubReplacements)) {
      content = this.replaceToken(content, `%%${key}%%`, value)
    }
    
    return content
  }
  
  async readStub(stub?: string): Promise<string> {
    stub = stub ? stub : this.args.type
    this.content = await readStub(stub)
    return this.content
  }
  
  async fillStub(content?: string): Promise<string> {
    this.content = content ? content : this.content;

    if (!this.content) {
      throw new Error('No content');
    }
    
    if (this.args.type === 'importer') {
      this.content = await this.defineLibImporterModule(this.content)
    }

    if (this.args.type === 'repository') {
      this.content = await this.defineLibRepositoryModule(this.content)
    }

    if (this.args.type === 'parser') {
      this.content = await this.defineLibParserModule(this.content)
    }
    
    return this.content
  }

  async saveToFile(content: string): Promise<string> {
    this.content = content ? content : this.content;

    if (!this.content) {
      throw new Error('No content');
    }

    await saveToFile(content, this.args, this.options)
    return this.content
  }

  replaceToken(content: string, find: string, replace: string) {
    return content.replace(new RegExp(this.escapeRegExp(find), 'g'), replace)
  }

  escapeRegExp(content: string) {
    return content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
 
  clearContent(): void {
    this.content = null
  }
}