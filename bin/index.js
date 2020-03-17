#!/usr/bin/env node

const figlet = require('figlet');
const chalk = require('chalk');
const { getSummary } = require('../helpers/covid');
const welcome = figlet.textSync('ncov19', { horizontalLayout: 'full', font: 'Banner3-D' });

console.log(chalk.yellowBright(welcome));
console.log(chalk.bgGrey.yellowBright(' Made with <3 by mhackyu <mark.christian.paderes@gmail.com> \n'));

require('yargs')
  .scriptName('covid19')
  .usage('Usage: $0 <command> [options]')
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
