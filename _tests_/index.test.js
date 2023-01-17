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
  // eslint-disable-next-line implicit-arrow-linebreak
  path.join(__dirname, '..', '__fixtures__', filename);

const extensions = [
  ['json', 'json', 'stylish', 'result_stylish.txt'],
  ['yaml', 'yaml', 'stylish', 'result_stylish.txt'],
  ['yml', 'yml', 'stylish', 'result_stylish.txt'],
  ['json', 'yml', 'stylish', 'result_stylish.txt'],

  ['json', 'json', 'plain', 'result_plain.txt'],
  ['yaml', 'yaml', 'plain', 'result_plain.txt'],
  ['yml', 'yml', 'plain', 'result_plain.txt'],
  ['json', 'yml', 'plain', 'result_plain.txt'],

  ['json', 'json', 'json', 'result_json.txt'],
  ['yaml', 'yaml', 'json', 'result_json.txt'],
  ['yml', 'yml', 'json', 'result_json.txt'],
  ['json', 'yml', 'json', 'result_json.txt'],
];

test.each(extensions)(
  'Extensions and format(%s, %s, %s)',
  (file1Extension, file2Extension, format, resultFile) => {
    const fileAfter = getFixturePath(`file1.${file1Extension}`);
    const fileBefore = getFixturePath(`file2.${file2Extension}`);
    const result = fs.readFileSync(getFixturePath(resultFile), 'utf8');

    expect(genDiff(fileAfter, fileBefore, format)).toEqual(result);
  }
);
