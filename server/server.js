import express from 'express';
import expressGraphql from 'express-graphql';
import bodyParser from 'body-parser';
import { graphql } from 'graphql';
import path from 'path';

import schema from '../schema/schema.js';

/*
  Configure routes
*/
const routes = express.Router();


routes.use(bodyParser.text({ type: 'application/graphql' }));
routes.use(bodyParser.urlencoded({extended:false}));
routes.use(bodyParser.json());

routes.use('/', (req, res, next) => {
  console.log('got req', req.url);
  console.log('got req body', req.body);
  console.log('got req body query', req.body.query);
  console.log('got req query', req.query);
  next();
})

routes.use(express.static('./client/public/'));

routes.get('/bundle.js', (req, res) => {
  let bundle = path.join(__dirname, '../', '/builds', 'bundle.js');
  res.sendFile(bundle);
})

routes.use('/graphql', expressGraphql({
  schema: schema,
  graphiql: false
}));

// routes.post('/graphql', (req, res) => {
//   console.log('in graphql route');
//   console.log('req body', req.body);
//   console.log('req body query', req.body.query);
//   console.log('req query', req.query);
//   let query = req.body;
//
//   graphql(schema, query)
//   .then( result => {
//     console.log('got graphql result!', result);
//     // res.send(result);
//     res.send(JSON.stringify(result, null, 2));
//   })
// })

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
