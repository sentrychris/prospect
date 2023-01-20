#!/usr/bin/env ts-node

import type {
  ImporterOptions,
  RepositoryOptions,
  ParserOptions,
  DataAccessOptions
} from './src/console/lib/generators/GeneratorOptions';
import {
  configurator,
  generateImporter,
  generateRepository,
  generateParser,
  generateDataAccessModule
} from './src/console';
import { Command } from 'commander';

export class Cli
{
    private program: Command;

    constructor() {
        this.program = new Command;
        this.setProgramCommands();
    }

    parse() {
        this.program.parse()
    }

    setProgramName() {
        this.program.name('iceman-cli')
            .description('CLI tools for the tarkov iceman bot')
            .version(process.env.VERSION_CONSTRAINT ?? 'none')
    }

    setProgramCommands() {
        this.setAppDevelopmentPort()
        this.setAppSecretForRouteAuthorization()
        this.generateBotDataAccessModule()
        this.generateServerLibParserModule()
        this.generateServerLibRepositoryModule()
        this.generateServerLibImporterModule()
    }

    generateBotDataAccessModule() {
      this.program.command('make:data-access')
        .description('Make a bot data access module')
        .option('--classname <classname>', 'classname')
        .option('--resource <resource>', 'classname')
        .option('--title <title>', 'classname')
        .option('--export <export>', 'classname')
        .action((options: DataAccessOptions) => generateDataAccessModule(options))
    }

    generateServerLibParserModule() {
      this.program.command('make:parser <module>')
        .description('Make a parser module')
        .option('--classname <classname>', 'Importer classname')
        .option('--resource <resource>', 'Importer classname')
        .action((module: string, options: ParserOptions) => generateParser({module}, options))
    }

    generateServerLibRepositoryModule() {
      this.program.command('make:repository <module>')
        .description('Make a repository module')
        .option('--classname <classname>', 'Importer classname')
        .option('--key <key>', 'Importer classname')
        .option('--collection <collection>', 'Importer classname')
        .option('--resource <resource>', 'Importer classname')
        .option('--types <types>', 'Importer classname')
        .option('--parser <parser>', 'Importer classname')
        .action((module: string, options: RepositoryOptions) => generateRepository({module}, options))
    }

    generateServerLibImporterModule() {
      this.program.command('make:importer <module>')
        .description('Make an importer module')
        .option('--classname <classname>', 'Importer classname')
        .option('--key <key>', 'Importer classname')
        .option('--collection <collection>', 'Importer classname')
        .option('--types <types>', 'Importer classname')
        .option('--repository <repository>', 'Importer classname')
        .action((module: string, options: ImporterOptions) => generateImporter({module}, options))
    }

    setAppDevelopmentPort() {
        this.program.command('app:port')
            .description('Set the port you would like to use to serve the api')
            .argument('<port>', 'The port to use')
            .action((port: string | number) => configurator.setAppDevelopmentPort(port))
    }

    setAppSecretForRouteAuthorization() {
        this.program.command('app:secret')
            .description('Generate an app secret for route authorization')
            .action(configurator.setAppSecret.bind(configurator))
    }
}

const commander = new Cli;
commander.parse()