const { readFile } = require('fs');
const config = require('./response-config');


function json(response) {
    return object => {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(object));
    };
}

function sendFile(response) {
    return path => {
        readFile(path, (err, data) => {
            if (err) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(
                    {error: `Error on the server side. ${err.message}`},
                    null,
                    '  '
                ));
            } else {
                setFileTypeHeader(response, path);
                response.end(data);
            }
        });
    };
}

function setFileTypeHeader(response, path) {
    if (response.getHeader('Content-Type')) {
        return;
    }
    let fileExtension = path.split('.').pop().toLowerCase();
    response.setHeader('Content-Type', config.fileTypeByExtension[fileExtension] || 'text/plain');
}

module.exports = response => {
    response.statusCode = 200;

    response.json = json(response);
    response.sendFile = sendFile(response);
};
