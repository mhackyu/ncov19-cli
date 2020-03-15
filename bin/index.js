#!/usr/bin/env node

const { getUpdatedReport } = require('../helpers/covid');

const figlet = require('figlet');
const chalk = require('chalk');

const welcome = figlet.textSync('covid19', { horizontalLayout: 'full', font: 'Banner3-D' });
console.log(chalk.yellowBright(welcome));
console.log(chalk.bgYellowBright.black('Author: Mark Christian Paderes <mark.christian.paderes@gmail.com> \n'));

// require('yargs')
//   .scriptName('covid19')
//   .usage('Usage: $0 <command> [options]')
//   .command(
//     'confirmed',
//     'get confirmed covid19 cases based on location',
//     () => {
//       // yargs.positional('location', {
//       //   type: 'string',
//       //   default: '',
//       //   describe: 'the name to say hello to'
//       // });
//     },
//     (argv) => {
//       getUpdatedReport()
//         .then((result) => {
//           console.log(result);
//         }).catch((err) => {
//           console.log(err);
//         });
//       // const { location } = argv;
//       // console.log(`Location set to ${location}`);
//     }
//   )
//   .help('h')
//   .alias('v', 'version')
//   .alias('h', 'help').argv;

require('yargs')
  .scriptName('covid19')
  .usage('Usage: $0 <command> [options]')
  .command(
    '$0',
    'get summary of covid-19 cases',
    () => {},
    () => {
      getUpdatedReport()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
  .command(
    'confirmed',
    'get confirmed covid-19 cases based on location',
    () => {
      // yargs.positional('location', {
      //   type: 'string',
      //   default: '',
      //   describe: 'the name to say hello to'
      // });
    },
    (argv) => {
      console.log('confirmed');
      // getUpdatedReport()
      //   .then((result) => {
      //     console.log(result);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // const { location } = argv;
      // console.log(`Location set to ${location}`);
    }
  )
  .help('h')
  .alias('v', 'version')
  .alias('h', 'help').argv;
