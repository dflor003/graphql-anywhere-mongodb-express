const GRAPHIQL_VERSION = '0.11.2';

export const GraphiQLHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      height: 100%;
      margin: 0;
      width: 100%;
      overflow: hidden;
    }
    #graphiql {
      height: 100vh;
    }
  </style>

  <link href="//cdn.jsdelivr.net/npm/graphiql@${GRAPHIQL_VERSION}/graphiql.css" rel="stylesheet" />
  <script src="//cdn.jsdelivr.net/fetch/0.9.0/fetch.min.js"></script>
  <script src="//cdn.jsdelivr.net/react/15.4.2/react.min.js"></script>
  <script src="//cdn.jsdelivr.net/react/15.4.2/react-dom.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/graphiql@${GRAPHIQL_VERSION}/graphiql.min.js"></script>

</head>
<body>
<div id="graphiql">Loading...</div>
<script>

  // Parse the search string to get url parameters.
  var search = window.location.search;
  var parameters = {};
  search.substr(1).split('&').forEach(function (entry) {
    var eq = entry.indexOf('=');
    if (eq >= 0) {
      parameters[decodeURIComponent(entry.slice(0, eq))] =
        decodeURIComponent(entry.slice(eq + 1));
    }
  });

  // if variables was provided, try to format it.
  if (parameters.variables) {
    try {
      parameters.variables =
        JSON.stringify(JSON.parse(parameters.variables), null, 2);
    } catch (e) {
      // Do nothing, we want to display the invalid JSON as a string, rather
      // than present an error.
    }
  }

  // When the query and variables string is edited, update the URL bar so
  // that it can be easily shared
  function onEditQuery(newQuery) {
    parameters.query = newQuery;
    updateURL();
  }

  function onEditVariables(newVariables) {
    parameters.variables = newVariables;
    updateURL();
  }

  function onEditOperationName(newOperationName) {
    parameters.operationName = newOperationName;
    updateURL();
  }

  function updateURL() {
    var newSearch = '?' + Object.keys(parameters).filter(function (key) {
        return Boolean(parameters[key]);
      }).map(function (key) {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(parameters[key]);
      }).join('&');
    history.replaceState(null, null, newSearch);
  }

  // Defines a GraphQL fetcher using the fetch API. You're not required to
  // use fetch, and could instead implement graphQLFetcher however you like,
  // as long as it returns a Promise or Observable.
  function graphQLFetcher(graphQLParams) {
    // This example expects a GraphQL server at the path /graphql.
    // Change this to point wherever you host your GraphQL server.
    return fetch('/graphql', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParams),
      credentials: 'include',
    }).then(function (response) {
      return response.text();
    }).then(function (responseBody) {
      try {
        return JSON.parse(responseBody);
      } catch (error) {
        return responseBody;
      }
    });
  }

  ReactDOM.render(
    React.createElement(GraphiQL, {
      fetcher: graphQLFetcher,
      query: parameters.query,
      variables: parameters.variables,
      operationName: parameters.operationName,
      onEditQuery: onEditQuery,
      onEditVariables: onEditVariables,
      onEditOperationName: onEditOperationName
    }),
    document.getElementById('graphiql')
  );
</script>
</body>
</html>
`;