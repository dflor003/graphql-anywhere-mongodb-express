# graphql-anywhere-mongodb-express

Express middleware that serves up an endpoint and optionally graphiql that processes schemaless mongodb graphql requests using [graphql-anywhere-mongodb](https://github.com/dflor003/graphql-anywhere-mongodb).

**IMPORTANT:** This middleware is mostly for demo purposes. You should not expose arbitrary MongoDB collections via an endpoint. In real-world scenarios, you would just use [graphql-anywhere-mongodb](https://github.com/dflor003/graphql-anywhere-mongodb) by itself on the server-side to read unstructured data from MongoDB.

## Installation

Install via `npm`:

```sh
npm install --save graphql-anywhere-mongodb graphql-anywhere-mongodb-express
```

Alternatively install via `yarn`:

```sh
yarn add graphql-anywhere-mongodb graphql-anywhere-mongodb-express
```

## Usage

Add the app to your expressjs server as an endpoint:

```js
import * as express from 'express';
import mongoGraphql from 'graphql-anywhere-mongodb-express';

const app = express();

...
const mongoUri = process.env.MONGO_URI;
app.use('/graphql', mongoGraphql({
  uri: mongoUri, // Can initialize via mongo URI

  graphiql: true, // Optionally enable graphiql

  // Optional whitelist of collections that can be queried
  whitelist: ['restaurants'],
}));

// Alternatively can pass an existing mongodb connection
// from the official node mongodb driver
app.use('/graphql', mongoGraphql({
  connection: existingConnection,
}));
```
