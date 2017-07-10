import * as bodyParser from 'body-parser';
import { Router } from 'express';
import { GraphQLMongoClientOptions } from 'graphql-anywhere-mongodb';
import { mongoGraphQLMiddleware } from './middlewares/mongo-graphql-middleware';
import { MongoGraphQLOptions } from './options';
import { connectToMongoMiddleware } from './middlewares/connection-middleware';
import { graphiqlMiddleware } from './middlewares/serve-graphiql-middleware';

export { MongoGraphQLOptions } from './options';

export default function mongoGraphql(options: MongoGraphQLOptions & GraphQLMongoClientOptions = {}): Router {
  const router = Router();

  // POST route to make requests
  router.post('/',
    bodyParser.json(),
    connectToMongoMiddleware(options),
    mongoGraphQLMiddleware(),
  );

  // If Graphiql enabled, add it
  if (options.graphiql === true) {
    router.get('/', graphiqlMiddleware());
  }

  return router;
}
