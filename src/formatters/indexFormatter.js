/* eslint-disable comma-dangle */
import makeStylish from './stylish.js';
import makeJson from './json.js';
import makePlain from './plain.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(data);
    case 'plain':
      return makePlain(data);
    case 'json':
      return makeJson(data);
    default:
      throw new Error(
        `Format type is invalid: '.${format}'! Try other file formats.`
      );
  }
};
