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
var ELASTICSEARCH_URL = url.parse(
  'https://site:45083ed4c9c3c470952e4d34cffd97ed@bofur-us-east-1.searchly.com');

// Server
var app = connect();

// Rewrite routes to index.html
app.use(modRewrite([
  '^/signup /index.html',
  '^/login /index.html',
  '^/logout /index.html',
  // Single date: 01-21-1987
  '^/log/\\d{2}-\\d{2}-\\d{4}$ /index.html',
  // Date range: 01-21-1987...01-21-2014
  '^/log/\\d{2}-\\d{2}-\\d{4}\.\.\.\\d{2}-\\d{2}-\\d{4}$ /index.html'
]));

app.use(serveStatic('public', {
  index: ['index.html']
}));

// app.use('/test', function (req, res, next) {
//   // var proxy = proxy();
//   console.log(proxy)
// });

app.use('/api', proxy(ELASTICSEARCH_URL));

app.listen(PORT);

console.log('Server listening on port', PORT);
