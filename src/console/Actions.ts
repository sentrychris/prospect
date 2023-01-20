import type { ImporterOptions, RepositoryOptions, ParserOptions } from './Options';
import { Generator } from './Generator';

export function generateImporter(args: {type: string}, options: ImporterOptions): void {
  const generator = new Generator(args, options)
  generator.readStub(args.type)
    .then(async content => await generator.fillStub(content))
    .then(async content => await generator.saveToFile(content))
    .catch(error => console.error(error.message))
    .finally(() => generator.clearContent())
}

export function generateRepository(args: {type: string}, options: RepositoryOptions): void {
  const generator = new Generator(args, options)
  generator.readStub(args.type)
    .then(async content => await generator.fillStub(content))
    .then(async content => await generator.saveToFile(content))
    .catch(error => console.error(error.message))
    .finally(() => generator.clearContent())
}

export function generateParser(args: {type: string}, options: ParserOptions): void {
  const generator = new Generator(args, options)
  generator.readStub(args.type)
    .then(async content => await generator.fillStub(content))
    .then(async content => await generator.saveToFile(content))
    .catch(error => console.error(error.message))
    .finally(() => generator.clearContent())
}