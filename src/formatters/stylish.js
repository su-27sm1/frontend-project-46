/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import _ from 'lodash';

const space = ' ';
const spaceQuantity = 2;
const stringify = (diff, indent, makeHandler, depth) => {
  const [key, val] = diff;
  switch (val.difference) {
    case 'changed':
      return `${indent}- ${key}: ${makeHandler(
        val.value1,
        depth + 2
      )}\n${indent}+ ${key}: ${makeHandler(val.value2, depth + 2)}`;
    case 'added':
      return `${indent}+ ${key}: ${makeHandler(val.value, depth + 2)}`;
    case 'deleted':
      return `${indent}- ${key}: ${makeHandler(val.value, depth + 2)}`;
    default:
      return `${indent}  ${key}: ${makeHandler(val.value || val, depth + 2)}`;
  }
};

export default (value) => {
  const iter = (iterValue, depth) => {
    if (!_.isObject(iterValue)) return `${iterValue}`;

    const indentSize = depth * spaceQuantity;
    const currentIndent = space.repeat(indentSize);
    const bracketIndent = space.repeat(indentSize - spaceQuantity);

    const lines = Object.entries(iterValue).map((data) =>
      stringify(data, currentIndent, iter, depth)
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, 1);
};
