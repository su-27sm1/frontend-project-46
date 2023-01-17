/* eslint-disable comma-dangle */
import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

export default (diff) => {
  const iter = (node, key = '') => {
    const result = node.flatMap((item) => {
      const ancestors = [...key, item.key];

      switch (item.type) {
        case 'nested':
          return iter(item.children, ancestors);
        case 'added':
          return `Property '${ancestors.join(
            '.'
          )}' was added with value: ${stringify(item.val)}`;
        case 'deleted':
          return `Property '${ancestors.join('.')}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${ancestors.join(
            '.'
          )}' was updated. From ${stringify(item.val1)} to ${stringify(
            item.val2
          )}`;
        default:
          return `Unknown type ${item.type}`;
      }
    });

    return result.filter((item) => item !== null).join('\n');
  };
  return iter(diff, []);
};
