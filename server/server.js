import express from 'express';
const routes = express.Router();

routes.use('*', (req, res) => {
  res.send('hi!').end();
})

if (process.env !== 'test') {

  const app = express().use('/', routes);

  const port = 7000;
  app.listen(port);
  console.log('Successfully listening on port', port);
}

export default routes;
