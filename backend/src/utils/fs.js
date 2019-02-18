/**
 *
 * 对 fs 进行封装
 */

const FILE_CODE = {
  NOT_FOUND: 'ENOENT',
};

const fs = require('fs');

/**
 *
 * @type {function}
 */
const readable = fs.createReadStream;

const readJSON = async path => {
  let data = {};
  return new Promise(resolve => {
    readable(path)
      .on('data', chunk => {
        chunk && (data = JSON.parse(chunk));
      })
      .on('error', error => {
        console.log(error);
        resolve(data);
      })
      .on('close', () => {
        resolve(data);
      });
  });
};

const writable = fs.createWriteStream;

const updateFile = async (
  path,
  newData = {},
  options = { encoding: 'utf8' }
) => {
  let data = {};
  return new Promise(resolve => {
    const startWrite = () => {
      const w = writable(path, options);
      Object.assign(data, newData);
      w.on('close', () => {
        resolve();
      });
      w.write(JSON.stringify(data));
      w.end();
    };
    readable(path, options)
      .on('error', err => {
        if (err.code === FILE_CODE.NOT_FOUND) {
          startWrite();
        } else {
          console.log(`${path} 读取异常：${err}`);
        }
      })
      .on('data', chunk => {
        chunk && (data = JSON.parse(chunk));
      })
      .on('close', startWrite);
  });
};

module.exports = {
  updateFile,
  readable,
  readJSON,
  mkdirSync: fs.mkdirSync,
};
