const http = require('http');
const fs = require('fs');

// File Extension : Content-Type header
const FileTypesByExtensions = {
    'html': 'text/html',
    'js': 'application/javascript',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'json': 'application/json',
    'xml': 'application/xml'
};

const server = http.createServer((request, response) => {
    let body = '';
    request.on('data', chunk => body += chunk);
    request.on('end', () => {

        response.setHeader('Access-Control-Allow-Origin', '*');

        if (request.method === 'GET') {
            let filePath = request.url.toLowerCase();
            fs.readFile(`./static${filePath}`, (err, data) => {
                if (err) {
                    response.statusCode = 404;
                    response.end();
                } else {
                    // Gets file extension from the url which looks like: /test.css
                    let fileExtension = filePath.split('.').pop();
                    response.setHeader('Content-Type', FileTypesByExtensions[fileExtension]);
                    response.statusCode = 200;
                    response.end(data);
                }
            });
        } else {
            response.statusCode = 404;
            response.end();
        }
    });
});

server.listen(8000, () => {
    console.log('Listening to http://localhost:8000');
});
