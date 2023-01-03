#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
program
  .name('Gendiff')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filePath1, filePath2) => {
    const options = program.opts();
    if (options.format === 'stylish' || options.format === undefined) {
      console.log(genDiff(filePath1, filePath2, 'stylish'));
    } else if (options.format === 'plain') {
      console.log(genDiff(filePath1, filePath2, 'plain'));
    } else if (options.format === 'json') {
      console.log(genDiff(filePath1, filePath2, 'json'));
    }
  });
program.parse();
