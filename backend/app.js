const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());

app.use(require('./src/middleware'));

module.exports = () => app;
