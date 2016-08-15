import express from 'express';
import bodyParser from 'body-parser';
import { graphql } from 'graphql';

import schema from '../schema/schema.js';

/*
  Configure routes
*/
const routes = express.Router();
// routes.use(bodyParser.urlencoded({extended:false}));
// routes.use(bodyParser.json());
routes.use(bodyParser.text({ type: 'application/graphql' }));

routes.use('/', (req, res, next) => {
  console.log('got req', req.url);
  next();
})


/*
  GraphQL Endpoints
 */
routes.post('/graphql', (req, res) => {
  let query = req.body;
  console.log('grabbed query', query);
  graphql(schema, query)
  .then( result => {
    console.log('got graphql result!', result);
    res.send(JSON.stringify(result, null, 2));
  })
})

/*
  API
 */
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
