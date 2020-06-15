const RPCWebSocket = require('rpc-websockets').Server;

const socket = new RPCWebSocket({
    port: 4000,
    host: 'localhost',
    path: '/'
});

socket.setAuth(user => user.login === 'admin' && user.password === 'admin');
socket.register('sum', params => params.reduce((a, b) => a + b, 0)).public();
socket.register('mul', params => params.reduce((a, b) => a * b, 1)).public();
socket.register('fact', fact).protected();

function fact(n) {
    return n === 1 ? 1 : n * fact(n - 1);
}