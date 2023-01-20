import type { ImporterOptions, RepositoryOptions, ParserOptions, DataAccessOptions } from './lib/generators/GeneratorOptions';
import { BotModuleGenerator } from './lib/generators/BotModuleGenerator';
import { ServerModuleGenerator } from './lib/generators/ServerModuleGenerator';
import { AppConfigurator } from './lib/AppConfigurator';

function generateServerModule<T>(type: string, args: {module: string}, options: T) {
  const generator = new ServerModuleGenerator(args, options);
  generator.stub(type)
    .then(async definition => await generator.fill(type, definition))
    .then(async module => await generator.save('server', module))
    .catch(error => console.error(error.message))
    .finally(() => generator.clearContent());
}

function generateBotModule<T>(type: string, options: T) {
  const generator = new BotModuleGenerator({}, options);
  generator.stub(type)
    .then(async definition => await generator.fill(type, definition))
    .then(async module => await generator.save('bot', module))
    .catch(error => console.error(error.message))
    .finally(() => generator.clearContent());
}

export function generateImporter(args: {module: string}, options: ImporterOptions): void {
  generateServerModule<ImporterOptions>('importer', args, options);
}

export function generateRepository(args: {module: string}, options: RepositoryOptions): void {
  generateServerModule<RepositoryOptions>('repository', args, options);
}

export function generateParser(args: {module: string}, options: ParserOptions): void {
  generateServerModule<ParserOptions>('parser', args, options);
}

export function generateDataAccessModule(options: DataAccessOptions): void {
  generateBotModule<DataAccessOptions>('data-access', options)
}

export const configurator = new AppConfigurator;