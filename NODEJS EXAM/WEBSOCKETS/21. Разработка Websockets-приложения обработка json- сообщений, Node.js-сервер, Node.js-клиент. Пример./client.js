const WebSocket = require('ws');

const jsonSocket = new WebSocket('ws://localhost:4000/');

const name = process.argv[2];

jsonSocket.onopen = () => {
    let message = {client: name};
    jsonSocket.send(JSON.stringify(message));
};
jsonSocket.onmessage = message => {
    console.log(message.data);
};