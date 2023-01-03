import { resolve, extname } from 'path';
import fs from 'fs';
import parsers from './parsers.js';
import buildTree from './buildTree.js';

const getAbsolutePath = (fileName) => resolve(process.cwd(), fileName);

const getFormat = (filepath) => extname(filepath).slice(1);

export default (fileName1, fileName2) => {
  const path1 = getAbsolutePath(fileName1);
  const data1 = fs.readFileSync(path1, 'utf8');
  const parsedData1 = parsers(data1, getFormat(fileName1));

  const path2 = getAbsolutePath(fileName2);
  const data2 = fs.readFileSync(path2, 'utf8');
  const parsedData2 = parsers(data2, getFormat(fileName2));

  return buildTree(parsedData1, parsedData2);
};
