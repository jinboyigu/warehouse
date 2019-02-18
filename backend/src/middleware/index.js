/**
 * @description middleware通用处理
 */

const Storage = require('./storage');

const allModuleMap = new Map();

const setModule = _module => {
  allModuleMap.set(_module.name.toLowerCase(), _module);
};

setModule(Storage);

module.exports = async function(ctx, next) {
  const res = ctx.res;
  res.setHeader('Content-Type', 'application/json');
  const reqURL = require('url').parse(ctx.request.url, true);
  const [module, action] = reqURL.query.func.split(':');
  if (allModuleMap.has(module)) {
    const result = await allModuleMap.get(module)[action](ctx.request.body);
    res.writeHead(200);
    res.end(JSON.stringify(result));
  } else {
    console.log('func not found');
  }
  await next();
};
