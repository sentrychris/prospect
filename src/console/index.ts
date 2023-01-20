import type { ImporterOptions, RepositoryOptions, ParserOptions } from './lib/Options';
import { Generator } from './lib/Generator';

function generate<T>(type: string, args: {module: string}, options: T) {
  const generator = new Generator(args, options)
  generator.readStub('importer')
    .then(async content => await generator.fillStub(type, content))
    .then(async content => await generator.saveToFile(content))
    .catch(error => console.error(error.message))
    .finally(() => generator.clearContent())
}

export function generateImporter(args: {module: string}, options: ImporterOptions): void {
  generate<ImporterOptions>('importer', args, options)
}

export function generateRepository(args: {module: string}, options: RepositoryOptions): void {
  generate<RepositoryOptions>('repository', args, options)
}

export function generateParser(args: {module: string}, options: ParserOptions): void {
  generate<ParserOptions>('parser', args, options)
}