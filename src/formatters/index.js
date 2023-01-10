/* eslint-disable comma-dangle */
import makeStylish from './stylish.js';
import makeJson from './json.js';
import makePlain from './plain.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(diff);
    case 'plain':
      return makePlain(diff);
    case 'json':
      return makeJson(diff);
    default:
      throw new Error(
        `Format type is invalid: '.${format}'! Try other file formats.`
      );
  }
};
