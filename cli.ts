#!/usr/bin/env ts-node

import type { ImporterOptions, RepositoryOptions, ParserOptions, DataAccessOptions } from './src/console/lib/generators/Options';
import { generateImporter, generateRepository, generateParser, generateDataAccessModule } from './src/console';
import { generateRandomString } from './src/utilities';
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';

export class Cli
{
    private program: Command;

    private envFile: string;

    constructor() {
        this.program = new Command;
        this.envFile = path.join(process.cwd(), '/.env');
        this.setProgramCommands();
    }

    parse() {
        this.program.parse()
    }

    setProgramName() {
        this.program.name('iceman-cli')
            .description('CLI dev tools for the tarkov iceman bot')
            .version('0.0.1')
    }

    setProgramCommands() {
        this.setAppSecretCommand()
        this.setAppDevelopmentPort()
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
        const command = (port: string | number) => {
            fs.readFile(this.envFile, 'utf-8', (err, data) => {
                if (err) return false;
                const replace  = /APP_PORT\s*=\s*([\S]+)/;
                this.writeEnvFile(
                    data.replace(new RegExp(replace, 'g'), `APP_PORT=${port}`),
                    `API will listen on port ${port}`
                );
            });
        }

        this.program.command('app:port')
            .description('Set the port you would like to use to serve the api')
            .argument('<port>', 'The port to use')
            .action((port: string | number) => command(port))
    }

    setAppSecretCommand() {
        const command = () => {
            fs.readFile(this.envFile, 'utf-8', (err, data) => {
                if (err) return false;
                const secret = `x0${generateRandomString(22)}`;
                const replace = /APP_SECRET\s*=\s*([\S]+)/;
                this.writeEnvFile(
                    data.replace(new RegExp(replace, 'g'), `APP_SECRET=${secret}`),
                    `Access token generated: ${this.encodeString(secret)}`
                );
            });
        }

        this.program.command('app:secret')
            .description('Generate an app secret for route authorization')
            .action(command)
    }

    private writeEnvFile(content: string, message: string) {
        fs.writeFile(this.envFile, content, 'utf-8', (err) => {
            if (err) return console.log(err);
            console.info(message)
        });
    }

    private encodeString(str: string) {
        const buffer = Buffer.from(str);
        return buffer.toString('base64');
    }
}

const commander = new Cli;
commander.parse()