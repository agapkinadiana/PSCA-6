var http = require('http');
var url = require('url');
const {parse} = require('querystring');

let http_handler=(req,res)=> {
	if (req.method == 'POST') {
		if (url.parse(req.url).pathname === '/formparameter') {
			let body = '';
			let result = '<br/>';
			req.on('data', chunk => {
				body += chunk.toString();
			});
			req.on('end', () => {
					console.log(body);
					let o = parse(body);
					for (let key in o) {
						result += `${key}=${o[key]}<br/>`
					}
					res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					res.end(result);
				}, (err, reply) => {
					console.log(err && err.stack);
					console.dir(reply);
				});
		}
	} else res.end('Nothing on this pages');
}
var server=http.createServer(function (req, res) {
	http_handler(req, res);
}).listen(5000);
console.log('Server running');