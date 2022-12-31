/* eslint-disable no-undef */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

test('difference test', () => {
  expect(genDiff(file1, file2)).toEqual(expected);
});
