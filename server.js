#!/usr/local/bin/node

// Core
var url = require('url');

// NPM
var connect = require('connect');
var serveStatic = require('serve-static');
var proxy = require('proxy-middleware');

// Configuration
var PORT = 9000;


var app = connect();

app.use(serveStatic('public', {
  index: ['index.html']
}));
app.use('/api',
  proxy(url.parse(
    'https://fthillivionamersedstingl:KR1vnEpeQBncd1LrYmMNEjjL@akagomez.cloudant.com/streak')));

app.listen(PORT);

console.log('Server listening on port', PORT);
