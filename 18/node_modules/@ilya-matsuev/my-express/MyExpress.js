const { createServer } = require('http');
const handler = require('./handlers');

let server;

class MyExpress {
    constructor() {
        server = createServer(handler.requestHandler);
    }

    get(url, callback) {
        handler.addUrlHandler('GET', url, callback);
    }

    post(url, callback) {
        handler.addUrlHandler('POST', url, callback);
    }

    put(url, callback) {
        handler.addUrlHandler('PUT', url, callback);
    }

    delete(url, callback) {
        handler.addUrlHandler('DELETE', url, callback);
    }

    all(url, callback) {
        handler.addUniversalUrlHandler(url, callback);
    }

    static(path) {
        handler.addStaticDirHandler(path);
    }

    listen(port, hostname = 'localhost', callback) {
        return server.listen(port, hostname, callback);
    }
}

module.exports = MyExpress;
