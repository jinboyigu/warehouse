const app = require('../../app')();
const port = 3000;

app.listen(port, () => {
  console.log(`serve start succeed, listen ${port} port`);
});
