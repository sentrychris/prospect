#!/usr/bin/env ts-node

import type { ResourceOptions, RepositoryOptions, ControllerOptions } from './src/interfaces/Generation';
import  { configurator, makeMongoResource, makeMongoRepository, makeMongoController } from './src/console';
import { Command } from 'commander';

export class Cli
{
  private program: Command;
  
  constructor() {
    this.program = new Command;
    this.setProgramCommands();
  }
  
  parse() {
    this.program.parse();
  }
  
  setProgramName() {
    this.program.name('prospect-cli')
      .description('CLI tools for prospect')
      .version(process.env.VERSION_CONSTRAINT ?? 'none');
  }
  
  setProgramCommands() {
    // application
    this.setAppDevelopmentPort();
    this.setAppSecretForRouteAuthorization();
    
    // code generators
    this.makeMongoResource();
    this.makeMongoRepository();
    this.makeMongoController();
  }
  
  makeMongoResource() {
    this.program.command('make:mongo:resource')
      .description('Make a mongo resource')
      .option('--resource <resource>', 'the resource name')
      .action((options: ResourceOptions) => makeMongoResource(options));
  }

  makeMongoRepository() {
    this.program.command('make:mongo:repository')
      .description('Make a mongo repository')
      .option('--repository <repository>', 'the repository name')
      .option('--resource <resource>', 'the associated resource name')
      .action((options: RepositoryOptions) => makeMongoRepository(options));
  }

  makeMongoController() {
    this.program.command('make:mongo:controller')
      .description('Make a mongo controller')
      .option('--controller <controller>', 'the controller name')
      .option('--repository <repository>', 'the associated repository')
      .option('--resource <resource>', 'the associated resource name')
      .action((options: ControllerOptions) => makeMongoController(options));
  }
  
  setAppDevelopmentPort() {
    this.program.command('app:port')
      .description('Set the port you would like to use to serve the api')
      .argument('<port>', 'The port to use')
      .action((port: string | number) => configurator.setAppDevelopmentPort(port));
  }
  
  setAppSecretForRouteAuthorization() {
    this.program.command('app:secret')
      .description('Generate an app secret for route authorization')
      .action(configurator.setAppSecret.bind(configurator));
  }
}

const commander = new Cli;
commander.parse();