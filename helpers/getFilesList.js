const path = require('path');
const fs = require('fs');

/**
 * get names of files on specific directory.
 * 
 * @param {String} directory absolute path
 * 
 * @return {Array} files names
 */
const getFilesList = (directory) => {
  return fs.readdirSync(directory);
}

module.exports = getFilesList;