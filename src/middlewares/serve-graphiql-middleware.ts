import { Handler } from 'express';
import { GraphiQLHtml } from './graphiql-html';
import { handleAsync } from '../handle-async';

export function graphiqlMiddleware(): Handler {
  return handleAsync((req, res) => {
    // Verify response accepts text/html
    if (!req.accepts('html')) {
      res.status(406).json({
        message: `Request must accept content type of text/html`
      });
      return;
    }

    // Send response
    const chunk = new Buffer(GraphiQLHtml, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Length', String(chunk.length));
    res.end(chunk);
  });
}
