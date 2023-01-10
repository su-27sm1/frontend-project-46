/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export default (diff) => {
  const iter = (iterDiff, space = '') =>
    Object.entries(iterDiff)
      .flatMap(([key, val]) => {
        if (val.difference === 'nested') {
          return iter(val.value, `${space}${key}.`);
        }
        if (val.difference === 'added') {
          return `Property '${space}${key}' was added with value: ${stringify(
            val.value
          )}`;
        }
        if (val.difference === 'deleted') {
          return `Property '${space}${key}' was removed`;
        }
        return val.difference === 'changed'
          ? `Property '${space}${key}' was updated. From ${stringify(
              val.value1
            )} to ${stringify(val.value2)}`
          : [];
      })
      .join('\n');
  return iter(diff);
};
