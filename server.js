#!/usr/local/bin/node

// Core
var url = require('url');

// NPM
var connect = require('connect');
var serveStatic = require('serve-static');
var proxy = require('proxy-middleware');

// Configuration
var PORT = 9000;
var ELASTICSEARCH_URL = url.parse(
  'https://site:45083ed4c9c3c470952e4d34cffd97ed@bofur-us-east-1.searchly.com');

// Server
var app = connect();

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
