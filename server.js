#!/bin/node

var static = require('node-static');

var fileServer = new static.Server('./public');
var portNumber = 9000;

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(portNumber);

console.log('Listening on port', portNumber)