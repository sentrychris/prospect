import type { ResourceOptions, RepositoryOptions, ControllerOptions, Maker } from '../interfaces/Generation';
import { MakeMongoResource } from './commands/MakeMongoResource';
import { MakeMongoRepository } from './commands/MakeMongoRepository';
import { MakeMongoController } from './commands/MakeMongoController';
import { AppConfigurator } from './commands/AppConfigurator';

function make<C extends Maker>(dialect: string, type: string, generator: C) {
  generator.stub(dialect, type)
    .then(async (definition) => await generator.fill(definition))
    .then(async (resource) => await generator.save(type, resource))
    .catch((error) => console.error(error.message))
    .finally(() => generator.clearContent());
}

function formatClassName(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function makeMongoResource(options: ResourceOptions): void {
  make<MakeMongoResource>('mongo', 'resource', new MakeMongoResource(
    formatClassName(options.resource),
    options
  ));
}

export function makeMongoRepository(options: RepositoryOptions): void {
  make<MakeMongoRepository>('mongo', 'repository', new MakeMongoRepository(
    formatClassName(options.repository),
    options
  ));
}

export function makeMongoController(options: ControllerOptions): void {
  make<MakeMongoController>('mongo', 'controller', new MakeMongoController(
    formatClassName(options.controller),
    options
  ));
}

export const configurator = new AppConfigurator;