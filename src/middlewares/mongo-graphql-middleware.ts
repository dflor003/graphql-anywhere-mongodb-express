import { handleAsync } from '../handle-async';
import { parse } from 'graphql/language/parser';
import { Handler } from 'express';
import { MongoGraphQLClient } from 'graphql-anywhere-mongodb';
import { log } from '../log';

export function mongoGraphQLMiddleware(): Handler {
  return handleAsync(async (req, res) => {
    // Get client off request
    const client: MongoGraphQLClient = (<any>req)['__mongoGraphQLClient'];

    try {
      // Extract query and variables from body
      const { query, variables } = req.body;
      log(`Received graphql request   : `, query);
      log(`Received graphql variables : `, variables);

      // Convert raw graphql query to GraphQL AST
      const processedQuery = parse(query);

      // Execute it and return a result
      const result = await client.find(processedQuery, variables);
      res.json(result);
    } catch (err) {
      log(`Error processing graphql request`, err);
      res.json({
        data: null,
        errors: [
          {
            message: err.message || err
          }
        ]
      });
    }
  });
}
