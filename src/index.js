import path from 'path';
import fs from 'fs';
import parsers from './parsers.js';
import buildTree from './buildTree.js';
import makeFormat from './formatters/index.js';

const getAbsolutePath = (fileName) => path.resolve(process.cwd(), fileName);

export const getFormat = (filepath) => path.extname(filepath).slice(1);

export default (fileName1, fileName2, format = 'stylish') => {
  const path1 = getAbsolutePath(fileName1);
  const data1 = fs.readFileSync(path1, 'utf8');
  const parsedData1 = parsers(data1, getFormat(fileName1));

  const path2 = getAbsolutePath(fileName2);
  const data2 = fs.readFileSync(path2, 'utf8');
  const parsedData2 = parsers(data2, getFormat(fileName2));

  const diff = buildTree(parsedData1, parsedData2);
  const formattedTree = makeFormat(diff, format);

  return formattedTree;
};
