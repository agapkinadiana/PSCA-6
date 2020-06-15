const http = require('http');
const ws = require('ws');
const fs = require('fs');


const httpServer = http.createServer((request, response) => {
    if (request.method == 'GET' && request.url == '/start') {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(fs.readFileSync('./client.html'));
    } else {
        response.writeHead(400, {'X-Error-Description': 'Bad Url', 'Content-Type': 'text/html; charset=utf-8'});
        response.end(`Sorry, but i dont understand what is "${request.url}" path :(`);
    }
})

httpServer.listen(3000, () => {
    console.log('Server listening port 3000')
});


let k = 0;
let mess;
const wsServer = new ws.Server({port: 4000, host: 'localhost', path: '/wsserver'});
wsServer.on('connection', (webSocket) => {

    webSocket.on('message', message => {
        mess = message;
        console.log(message);
    });

    setInterval(() => {
        webSocket.send(`Server: ${mess}`);
    }, 5000)
});