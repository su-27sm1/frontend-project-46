import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2).sort();

  const result = keys
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

export default (fileName1, fileName2) => {
  const path1 = getAbsolutePath(fileName1);
  const data1 = fs.readFileSync(path1, 'utf8');
  const parsedData1 = JSON.parse(data1);

  const path2 = getAbsolutePath(fileName2);
  const data2 = fs.readFileSync(path2, 'utf8');
  const parsedData2 = JSON.parse(data2);

  return getDiff(parsedData1, parsedData2);
};
