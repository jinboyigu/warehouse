/**
 * @description 接口共用继承类
 */

const fs = require('../utils/fs');
const path = require('path');

module.exports = class MiddlewareBase {
  static handleResult(data, code = 'S_OK') {
    return { data, code };
  }
  static defaultValue() {
    return {};
  }
  static getDefault(getKeys = false) {
    const defaultValue = this.defaultValue();
    return getKeys ? Object.keys(defaultValue) : defaultValue;
  }

  static getJsonPath() {
    return path.resolve(__dirname, `${this.name.toLowerCase()}/data.json`);
  }
  static async readDataJSON(_path) {
    return await fs.readJSON(_path || this.getJsonPath());
  }
  static async updateDataJSON(data, _path) {
    return await fs.updateFile(_path || this.getJsonPath(), data);
  }
};
