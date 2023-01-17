/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import _ from 'lodash';

const signIndent = (depth, spacesCount = 2) =>
  '  '.repeat(spacesCount * depth).slice(2);

const indent = (depth, spacesCount = 2) => '  '.repeat(spacesCount * depth);

const stringify = (value, treeDepth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const fromObjToArray = Object.entries(value);
  const lines = fromObjToArray.map(
    ([key, val]) =>
      `${indent(treeDepth + 1)}${key}: ${stringify(val, treeDepth + 1)}`
  );

  return ['{', ...lines, `${indent(treeDepth)}}`].join('\n');
};

export default (diff) => {
  const symbol = {
    add: '+',
    absence: '-',
    space: ' ',
  };

  const iter = (tree, depth) =>
    tree.map((item) => {
      const getValue = (_value, sign) =>
        `${signIndent(depth)}${sign} ${item.key}: ${stringify(
          _value,
          depth
        )}\n`;
      switch (item.type) {
        case 'nested':
          return `${indent(depth)}${item.key}: {\n${iter(
            item.children,
            depth + 1
          ).join('')}${indent(depth)}}\n`;
        case 'added':
          return getValue(item.val, symbol.add);
        case 'deleted':
          return getValue(item.val, symbol.absence);
        case 'unchanged':
          return getValue(item.val, symbol.space);
        case 'changed':
          return `${getValue(item.val1, symbol.absence)}${getValue(
            item.val2,
            symbol.add
          )}`;
        default:
          return `Error: Unsupported type: ${item.type}`;
      }
    });

  return `{\n${iter(diff, 1).join('')}}`;
};
