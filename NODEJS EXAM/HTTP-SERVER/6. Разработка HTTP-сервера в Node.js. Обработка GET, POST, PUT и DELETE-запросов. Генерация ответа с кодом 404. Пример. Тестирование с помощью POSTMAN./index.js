const http = require ('http');
const fs = require ('fs');

let HTTP404 = (response) => {
    response.statusCode = 404;
    response.statusMessage = "Resource not found";
    response.end("<h1>Resource not found</h1>");
};

http.createServer(function (request,response) {
    if(request.method ==='GET'){
        response.end('GET IS OKEY');
    }
    else  if (request.method ==='POST'){
        response.end('POST IS OKEY');
    }
    else  if (request.method ==='PUT'){
        response.end('PUT IS OKEY');
    }
    else  if (request.method ==='DELETE'){
        response.end('DELETE IS OKEY');
    }
    else HTTP404(response);


}).listen(3000);

console.log('run');