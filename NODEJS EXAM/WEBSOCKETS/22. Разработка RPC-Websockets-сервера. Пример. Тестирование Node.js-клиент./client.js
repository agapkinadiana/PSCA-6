const rpcSocket = require('rpc-websockets').Client;

const socket = new rpcSocket('ws://localhost:4000');

socket.on('open', () => {
    socket.call('sum', [2, 4, 6, 8, 10]).then(answer => console.log('sum: ' + answer));
    socket.call('mul', [3, 5, 7, 9, 11, 13]).then(answer => console.log('mul: ' + answer));

    socket.login({login: 'admin', password: 'admin'})
        .then(login => {
            if (login) {
                socket.call('fact', 5).then(answer => console.log('fact: ' + answer));
            } else {
                console.log('Unauthorized');
            }
        });
});