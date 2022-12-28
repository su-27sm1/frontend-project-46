#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2));
  });
program.parse(process.argv);
