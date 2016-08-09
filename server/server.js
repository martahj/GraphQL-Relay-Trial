import express from 'express';
const app = express();

console.log('did not error!');

if (process.env !== 'test') {
  const port = 7000;
  app.listen(port);
  console.log('Successfully listening on port', port);
} else {
  //
}
