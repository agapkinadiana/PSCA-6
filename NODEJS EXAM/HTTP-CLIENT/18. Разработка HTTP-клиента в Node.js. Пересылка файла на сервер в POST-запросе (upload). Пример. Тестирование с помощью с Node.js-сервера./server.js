const http = require ('http');
const url = require ('url');

let handler = (request, response) => {
    if(request.method === 'POST' && url.parse(request.url).pathname === '/upload'){
        console.log("File uploaded!");
        
        let data = '';
        request.on('data', chunk => {
            data += chunk;
        });
        request.on('end', () => {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end(data);
        });
    }
}

let server = http.createServer();
server.listen(5000, (v) => {console.log('run')})
        .on("error", (e)=>{console.log("Server error: "+e.code)})
        .on("request", handler);