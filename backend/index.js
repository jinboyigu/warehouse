const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);

/* eslint-disable-next-line no-console */
console.log('serve start succeed, listen 3000 port');
