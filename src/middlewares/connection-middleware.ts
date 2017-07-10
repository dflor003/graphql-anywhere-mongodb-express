import graphqlClient from 'graphql-anywhere-mongodb';
import { MongoGraphQLOptions } from '../options';
import { Handler } from 'express';
import { handleAsync } from '../handle-async';
import { MongoGraphQLClient, GraphQLMongoClientOptions } from 'graphql-anywhere-mongodb';
import { Db, MongoClientOptions } from 'mongodb';

export function connectToMongoMiddleware(options: MongoGraphQLOptions & GraphQLMongoClientOptions): Handler {
  // Setup options
  const mongoUri = options.uri || options.url;
  const connection = options.connection;
  let client: MongoGraphQLClient = null;

  // Error if both connection and URI or neither are specified
  if ([mongoUri, connection].filter(x => !!x).length !== 1) {
    throw new Error('Can only specify one of either uri/url or connection');
  }

  return handleAsync(async (req, res, next) => {
    (<any>req)['__mongoGraphQLClient'] = client || (client = await acquireClient(mongoUri, connection, options, options.mongoClientOptions));
    next();
  });
}

async function acquireClient(
  mongoUri: string,
  connection: Db,
  options: GraphQLMongoClientOptions,
  clientOptions: MongoClientOptions,
): Promise<MongoGraphQLClient> {
  // Connect to URI directly
  if (mongoUri) {
    return await graphqlClient.forUri(mongoUri, { ...clientOptions, ...options });
  }

  // Use pre existing client
  if (connection) {
    return graphqlClient.forConnection(connection, options);
  }

  // Could not acquire connection, fail the request
  throw new Error(`GraphQL MongoDB middleware could not find a way to connect to MongoDB. Please ensure you pass the right options.`);
}
