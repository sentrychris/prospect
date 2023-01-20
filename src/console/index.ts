import type { ImporterOptions, RepositoryOptions, ParserOptions } from './lib/Options';
import { ServerModuleGenerator } from './lib/ServerModuleGenerator';

function generateServerLibModule<T>(type: string, args: {module: string}, options: T) {
  const generator = new ServerModuleGenerator(args, options);
  generator.stub(type)
    .then(async definition => await generator.fill(type, definition))
    .then(async module => await generator.save(module))
    .catch(error => console.error(error.message))
    .finally(() => generator.clearContent());
}

export function generateImporter(args: {module: string}, options: ImporterOptions): void {
  generateServerLibModule<ImporterOptions>('importer', args, options);
}

export function generateRepository(args: {module: string}, options: RepositoryOptions): void {
  generateServerLibModule<RepositoryOptions>('repository', args, options);
}

export function generateParser(args: {module: string}, options: ParserOptions): void {
  generateServerLibModule<ParserOptions>('parser', args, options);
}