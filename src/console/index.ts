import type { ResourceOptions, RepositoryOptions, ControllerOptions, Maker } from '../interfaces/Generator';
import { MakeResource } from './commands/MakeResource';
import { MakeRepository } from './commands/MakeRepository';
import { MakeController } from './commands/MakeController';
import { AppConfigurator } from './commands/AppConfigurator';

function make<C extends Maker>(type: string, generator: C) {
  generator.stub(type)
    .then(async (definition) => await generator.fill(definition))
    .then(async (resource) => await generator.save(type, resource))
    .catch(error => console.error(error.message))
    .finally(() => generator.clearContent());
}

function formatClassName(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function makeResource(options: ResourceOptions): void {
  make<MakeResource>('resource', new MakeResource(
    formatClassName(options.resource),
    options
  ));
}

export function makeRepository(options: RepositoryOptions): void {
  make<MakeRepository>('repository', new MakeRepository(
    formatClassName(options.repository),
    options
  ));
}

export function makeController(options: ControllerOptions): void {
  make<MakeController>('controller', new MakeController(
    formatClassName(options.controller),
    options
  ));
}

export const configurator = new AppConfigurator;