import { Db, MongoClientOptions } from 'mongodb';

export interface MongoGraphQLOptions {
  uri?: string;
  url?: string;
  connection?: Db;
  graphiql?: boolean;
  mongoClientOptions?: MongoClientOptions;
}
