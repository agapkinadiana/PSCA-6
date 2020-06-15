var http = require('http');
var url = require('url');
var fs = require('fs');
let mp = require('multiparty');

let http_handler = (req,res) => {
	if (req.method == 'POST') {
		if (url.parse(req.url).pathname === '/upload') {
			let result = '';
			let form = new mp.Form({uploadDir: './static'});
			form.on('field', (name, value) => {
				console.log('------------field-------------');
				console.log(name, value);
				result += `<br/>---${name}= ${value}`;
			});
			form.on('file', (name, file) => {
				console.log('-----file ------------');
				console.log(name, file);
				result += `<br/>---${name}= ${file.originalFilename}: ${file.path}`;
			});
			form.on('error', (err) => {
				console.log('------err--------------');
				console.log('err =', err);
				res.writeHead(400, {'Content-Type': 'text/html;charset=utf-8'});
				res.write('<h1>Form/error</h1>');
				res.end()
			});
			form.on('close', () => {
				console.log('-----------close----------');
				res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
				res.write('<h1>Form</h1>');
				res.end(result);
			})
			form.parse(req); //for parsing form data, especially file uploads.
		}
	} else res.end('Nothing on this pages');
}
var server=http.createServer(function (req, res) {
	http_handler(req, res);
}).listen(5000);
console.log('Server running');