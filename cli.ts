#!/usr/bin/env ts-node

import type { ResourceOptions, RepositoryOptions, ControllerOptions } from './src/interfaces/Generation';
import  { configurator, makeResource, makeRepository, makeController } from './src/console';
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
    this.makeResource();
    this.makeRepository();
    this.makeController();
  }
  
  makeResource() {
    this.program.command('make:resource')
      .description('Make a resource')
      .option('--resource <resource>', 'the resource name')
      .action((options: ResourceOptions) => makeResource(options));
  }

  makeRepository() {
    this.program.command('make:repository')
      .description('Make a repository')
      .option('--repository <repository>', 'the repository name')
      .option('--resource <resource>', 'the associated resource name')
      .action((options: RepositoryOptions) => makeRepository(options));
  }

  makeController() {
    this.program.command('make:controller')
      .description('Make a controller')
      .option('--controller <controller>', 'the controller name')
      .option('--repository <repository>', 'the associated repository')
      .option('--resource <resource>', 'the associated resource name')
      .action((options: ControllerOptions) => makeController(options));
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