/**
 * @description storage 中间件
 */
const _ = require('lodash');
const MiddlewareBase = require('../base');

module.exports = class Storage extends MiddlewareBase {
  static defaultValue() {
    return {
      header: '',
      header1: '',
      header2: '',
      header3: '',
    };
  }
  static idNotFound() {
    return this.handleResult(void 0, 'FA_STORAGE_ID_NOT_FOUND');
  }
  static async get({ id }) {
    const data = await this.readDataJSON();
    const list = data.list || [];
    const item = list.find(o => o.id === id);
    return item ? this.handleResult(item) : this.idNotFound();
  }
  static async create(requestData) {
    const data = await this.readDataJSON();
    let item = _.assign(
      this.getDefault(),
      _.pick(requestData, this.getDefault(true))
    );
    const id = data.list.length + 1;
    item.id = id;
    data.list.push(item);
    await this.updateDataJSON(data);
    return this.handleResult({ id });
  }
  static async update(requestData) {
    const data = await this.readDataJSON();
    const list = data.list || [];
    const item = list.find(o => o.id === requestData.id);
    if (item) {
      _.assign(item, _.pick(requestData, this.getDefault(true)));
      await this.updateDataJSON(data);
      return this.handleResult();
    } else {
      return this.idNotFound();
    }
  }
  static async list() {
    const data = await this.readDataJSON();
    const list = data.list || [];
    return this.handleResult({
      list,
      total: list.length,
    });
  }
  static async delete({ id }) {
    const data = await this.readDataJSON();
    const list = data.list || [];
    const index = list.findIndex(o => o.id === id);
    if (index !== -1) {
      list.splice(index, 1);
      await this.updateDataJSON(data);
      return this.handleResult();
    } else {
      return this.idNotFound();
    }
  }
};
