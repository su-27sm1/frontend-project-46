/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable quote-props */
/* eslint-disable no-undef */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf8');

const extensions = ['yml', 'json', 'yaml'];
const resultStylish = readFile('result_stylish.txt');
const resultPlain = readFile('result_plain.txt');
const resultJson = readFile('result_json.txt');

test.each(extensions)('.add(%s)', (extension) => {
  const fileBefore = getFixturePath(`file1.${extension}`);
  const fileAfter = getFixturePath(`file2.${extension}`);

  expect(genDiff(fileBefore, fileAfter)).toBe(resultStylish);
  expect(genDiff(fileBefore, fileAfter, 'stylish')).toBe(resultStylish);
  expect(genDiff(fileBefore, fileAfter, 'plain')).toBe(resultPlain);
  expect(genDiff(fileBefore, fileAfter, 'json')).toBe(resultJson);
});
