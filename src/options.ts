import { Db, MongoClientOptions } from 'mongodb';

export interface MongoGraphQLOptions {
  /**
   * The URI connection string for mongodb.
   */
  uri?: string;

  /**
   * The URI connection string for mongodb.
   */
  url?: string;

  /**
   * Options to pass to the mongo client.
   */
  mongoClientOptions?: MongoClientOptions;

  /**
   * Optional pass the mongo driver connection to be used manually.
   */
  connection?: any;

  /**
   * Default MongoDB limit to apply to all graphql requests without a limit.
   * Defaults to 100.
   */
  defaultLimit?: number;

  /**
   * Maximum MongoDB limit that will be accepted.
   * Defaults to 10000.
   */
  maxLimit?: number;

  /**
   * If true will expose graphiql
   */
  graphiql?: boolean;

  /**
   * If graphiql = true, then this is the endpoint that graphiql will communicate with.
   * If not passed, defaults to the path it is hosted off of.
   */
  graphiqlEndpoint?: string;

  /**
   * If graphiql = true, then this is the title for GraphiQL.
   */
  graphiqlTitle?: string;
}
