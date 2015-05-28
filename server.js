#!/usr/local/bin/node

// Core
var url = require('url');

// NPM
var connect = require('connect');
var serveStatic = require('serve-static');
var modRewrite = require('connect-modrewrite');
var proxy = require('proxy-middleware');

// Configuration
var PORT = 9000;

// Fig give us a TCP address. We want an HTTP address.
var ES_URL = process.env.ES_URL;
var ES_CONNECTION_CONFIG = url.parse(ES_URL);

// Server
var app = connect();

// Rewrite routes to index.html
app.use(modRewrite([
  '^/signup /index.html',
  '^/login /index.html',
  '^/logout /index.html',
  // Date range: 01-21-1987...01-21-2014
  '^/log/\\d{2}-\\d{2}-\\d{4}.{3}\\d{2}-\\d{2}-\\d{4} /index.html',
  // Single date: 01-21-1987
  '^/log/\\d{2}-\\d{2}-\\d{4} /index.html',
  // Log search
  '^/search/ /index.html',
  '^/search /index.html',
  // Default log
  '^/log /index.html'
]));

app.use(serveStatic('public', {
  index: ['index.html']
}));

app.use('/api', proxy(ES_CONNECTION_CONFIG));

app.listen(PORT);

console.log('Server listening on port', PORT);
