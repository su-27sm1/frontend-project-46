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
// const file3 = getFixturePath('file1.yaml');
// const file4 = getFixturePath('file2.yaml');
// const file5 = getFixturePath('file1.yml');
// const file6 = getFixturePath('file2.yml');

const expected = fs.readFileSync(getFixturePath('result_json.json'), 'utf-8');

test('difference test', () => {
  expect(genDiff(file1, file2)).toEqual(expected);
  // expect(genDiff(file3, file4)).toEqual(expected);
  // expect(genDiff(file5, file6)).toEqual(expected);
  // expect(genDiff(file1, file6)).toEqual(expected);
});
