const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function (request, response) {
    if(request.method ==='GET'){
        let result = '';
        let p = url.parse(request.url, true);
        result =`pathname: ${p.pathname}<br/>`;
        decodeURI(p.pathname).split('/').forEach(e=>{result+=`${e}<br/>`}); 
        console.log(p.pathname.split('/'));
        response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        response.write('<h1>URL param</h1>');
        response.end(result);

    }
    else{
        response.writeHead (200,{ 'Content-Type':'text/html;charset=utf-8'});
        response.end();
    }


}).listen(3000);
console.log('Run server ');