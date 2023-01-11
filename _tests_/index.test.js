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

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const file3 = getFixturePath('file1.yaml');
const file4 = getFixturePath('file2.yaml');
const file5 = getFixturePath('file1.yml');
const file6 = getFixturePath('file2.yml');

const expected1 = fs.readFileSync(getFixturePath('result_stylish.txt'), 'utf8');

test('Stylish test', () => {
  expect(genDiff(file1, file2)).toEqual(expected1);
  expect(genDiff(file3, file4)).toEqual(expected1);
  expect(genDiff(file5, file6)).toEqual(expected1);
  expect(genDiff(file1, file6)).toEqual(expected1);
});

const expected2 = fs.readFileSync(getFixturePath('result_plain.txt'), 'utf8');

test('Plain test', () => {
  expect(genDiff(file1, file2, 'plain')).toEqual(expected2);
  expect(genDiff(file3, file4, 'plain')).toEqual(expected2);
  expect(genDiff(file5, file6, 'plain')).toEqual(expected2);
  expect(genDiff(file1, file6, 'plain')).toEqual(expected2);
});

const expected3 = fs.readFileSync(getFixturePath('result_json.json'), 'utf8');

test('Json test', () => {
  expect(genDiff(file1, file2, 'json')).toEqual(expected3);
  expect(genDiff(file3, file4, 'json')).toEqual(expected3);
  expect(genDiff(file5, file6, 'json')).toEqual(expected3);
  expect(genDiff(file1, file6, 'json')).toEqual(expected3);
});
