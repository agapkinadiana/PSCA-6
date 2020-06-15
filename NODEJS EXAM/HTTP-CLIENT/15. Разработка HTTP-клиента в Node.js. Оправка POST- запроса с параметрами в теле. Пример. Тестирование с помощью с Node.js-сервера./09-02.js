var http = require('http');
var url = require('url');
var fs = require('fs');
const {parse} = require('querystring');

let http_handler=(req,res)=> {
    if (req.method == 'POST' && url.parse(req.url).pathname === '/threepar') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let o = parse(body);
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end(`x+y+s=${o['x'] + o['y'] + o['s']}`);
        });
    }
}

var server=http.createServer(function (req, res) {
    http_handler(req, res);
}).listen(5000);