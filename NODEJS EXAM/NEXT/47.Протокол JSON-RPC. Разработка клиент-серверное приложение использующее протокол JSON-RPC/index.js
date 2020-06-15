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

server.listenHttp({host: 'localhost', port: 3000}, () => {
    console.log(`Listening to http://localhost:3000/`)
});

/*тело в постмане*/
//{
//     "jsonrpc": "2.0",
//     "method": "sum",
//     "params": [12, 23],
//     "id": 1
// }