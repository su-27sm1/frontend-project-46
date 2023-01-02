import fs from 'fs';
import _ from 'lodash';
import path, { extname } from 'path';
import parsers from './parsers.js';

const getDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys
    .reduce((acc, key) => {
      const minusKey = `- ${key}`;
      const plusKey = `+ ${key}`;
      const matchedValueKeys = ` ${key}`;

      if (!_.has(obj2, key)) {
        acc.push(`${minusKey}: ${obj1[key]}`);
      } else if (!_.has(obj1, key)) {
        acc.push(`${plusKey}: ${obj2[key]}`);
      } else if (obj1[key] !== obj2[key]) {
        acc.push(`${minusKey}: ${obj1[key]}\n${plusKey}: ${obj2[key]}`);
      } else {
        acc.push(` ${matchedValueKeys}: ${obj2[key]}`);
      }

      return acc;
    }, [])
    .join('\n');

  return `{\n${result}\n}`;
};

const getAbsolutePath = (fileName) => path.resolve(process.cwd(), fileName);

const getFormat = (filepath) => extname(filepath).slice(1);

// const file1 = parsers(readFile1, getFormat(filepath1));
// const file2 = parsers(readFile2, getFormat(filepath2));

// const readFile1 = readFile(filepath1);
// const readFile2 = readFile(filepath2);

export default (fileName1, fileName2) => {
  const path1 = getAbsolutePath(fileName1);
  const data1 = fs.readFileSync(path1, 'utf8');
  const parsedData1 = parsers(data1, getFormat(fileName1));

  const path2 = getAbsolutePath(fileName2);
  const data2 = fs.readFileSync(path2, 'utf8');
  const parsedData2 = parsers(data2, getFormat(fileName2));

  return getDiff(parsedData1, parsedData2);
};
