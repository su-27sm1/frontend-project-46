import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2)).map((key) => {
    if (!_.has(obj1, key)) {
      return [key, { difference: 'added', value: obj2[key] }];
    }
    if (!_.has(obj2, key)) {
      return [key, { difference: 'deleted', value: obj1[key] }];
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return [
        key,
        { difference: 'nested', value: buildTree(obj1[key], obj2[key]) },
      ];
    }
    if (obj1[key] !== obj2[key]) {
      return [
        key,
        { difference: 'changed', value1: obj1[key], value2: obj2[key] },
      ];
    }

    return [key, { difference: 'unchanged', value: obj1[key] }];
  });

  return _.fromPairs(keys);
};

export default buildTree;
