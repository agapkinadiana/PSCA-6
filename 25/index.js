const JsonRPCServer = require('jsonrpc-server-http-nats');

const server = new JsonRPCServer();

server.on('sum', (params, channel, response) => {
    if (!Array.isArray(params)) {
        response({message: 'Invalid params for the sum method'}, null);
    } else {
        response(null, params.reduce((a, b) => a + b));
    }
});

server.on('mul', (params, channel, response) => {
    if (!Array.isArray(params)) {
        response({message: 'Invalid params for the mul method'}, null);
    } else {
        response(null, params.reduce((a, b) => a * b));
    }
});

server.on('div', (params, channel, response) => {
    if (!Array.isArray(params) || params.length !== 2) {
        response({message: 'Invalid params for the div method'}, null);
    } else {
        response(null, params[0] / params[1]);
    }
});

server.on('proc', (params, channel, response) => {
    if (!Array.isArray(params) || params.length !== 2) {
        response({message: 'Invalid params for the proc method'}, null);
    } else {
        response(null, params[0] * 100 / params[1]);
    }
});

server.listenHttp({host: 'localhost', port: 3000}, () => {
    console.log(`Listening to http://localhost:3000/`)
});
