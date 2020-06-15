const http = require('http');
const fs = require('fs');

const server = http.createServer(function (request,response) {
    if(request.url ==='/text'){
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end('lalala');

    }
    else if(request.url === '/xmlhttprequest'){
        let html = fs.readFileSync('./xmlhttprequest.html');
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(html);
    }
    else if(request.url === '/fetch'){
        let html = fs.readFileSync('./fetch.html');
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(html);
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
        response.end();
    }
}).listen(3000);
console.log('run');
