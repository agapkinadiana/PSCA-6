const http = require('http');
const url = require('url');
const query = require('querystring');
const server = http.createServer(function (request, response) {
    response.writeHead (200,{ 'Content-Type':'text/html;charset=utf-8'});
    response.write(request.method);
    response.write(request.url);
    response.end();

}).listen(3000);
console.log('ruun');