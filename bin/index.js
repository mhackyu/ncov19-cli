#!/usr/bin/env node

const figlet = require('figlet');
const chalk = require('chalk');
const { getSummary } = require('../helpers/covid');
const welcome = figlet.textSync('covid19', { horizontalLayout: 'full', font: 'Banner3-D' });

console.log(chalk.yellowBright(welcome) + '\n');

require('yargs')
  .scriptName('covid19')
  .usage('Usage: $0 <command> [options]')
  .epilog(chalk.yellowBright(' Made with <3 by mhackyu <mark.christian.paderes@gmail.com> \n'))
  .command(
    '$0',
    'get summary of covid-19 cases',
    () => {},
    (yargv) => {
      getSummary(yargv.location);
    }
  )
  .option('l', {
    alias: 'location',
    default: '',
    describe: 'country/region'
  })
  .help('h')
  .alias('v', 'version')
  .alias('h', 'help').argv;
