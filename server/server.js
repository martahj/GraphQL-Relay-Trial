import express from 'express';
import expressGraphql from 'express-graphql';
import bodyParser from 'body-parser';
import { graphql } from 'graphql';
import path from 'path';

import schema from '../schema/schema.js';

const routes = express.Router();


routes.use(bodyParser.text({ type: 'application/graphql' }));
routes.use(bodyParser.urlencoded({extended:false}));
routes.use(bodyParser.json());

routes.use(express.static('./client/public/'));

routes.get('/bundle.js', (req, res) => {
  let bundle = path.join(__dirname, '../', '/builds', 'bundle.js');
  res.sendFile(bundle);
})

routes.use('/graphql', expressGraphql({
  schema: schema,
  graphiql: false
}));


routes.use('*', (req, res) => {
  console.log('in catch-all route');
  res.send('hi!').end();
})

if (process.env !== 'test') {
  //start server

  const app = express().use('/', routes);

  const port = 7000;
  app.listen(port);
  console.log('Successfully listening on port', port);
}

//export routes fro testing
export default routes;
