const express = require('express');
const {createClient} = require('webdav');

const app = express();
// Specify your credentials in the config for a Drive
const config = require('./config.json');
const webDavClient = createClient(config.webDav.yandexDisk.remoteUrl, config.webDav.yandexDisk.opts);

app.post('/md/:name', (request, response) => {
    const dirPath = '/' + request.params.name;
    webDavClient.exists(dirPath)
        .then(alreadyExists => {
            if (alreadyExists) {
                response.status(408);
                return {error: 'Such directory already exists'};
            } else {
                return webDavClient.createDirectory(dirPath).then(() => ({message: 'Directory\'s been created'}));
            }
        })
        .then(message => response.json(message))
        .catch(err => response.status(400).json({error: err.toString()}));
});

app.post('/rd/:name', (request, response) => {
    const dirPath = '/' + request.params.name;
    webDavClient.exists(dirPath)
        .then(alreadyExists => {
            if (alreadyExists) {
                return webDavClient.deleteFile(dirPath).then(() => ({message: 'Directory\'s been removed'}));
            } else {
                response.status(408);
                return {error: 'There is no such folder'};
            }
        })
        .then(message => response.json(message))
        .catch(err => response.status(400).json({error: err.toString()}));
});

app.post('/up/:name', (request, response) => {
    try {
        const filePath = '/' + request.params.name;
        request.pipe(webDavClient.createWriteStream(filePath))
            .on('end', () => response.json({message: 'File\'s been uploaded'}));
    } catch (err) {
        response.status(408).json({error: err.toString()})
    }
});

app.post('/down/:name', (request, response) => {
    const filePath = '/' + request.params.name;
    webDavClient.exists(filePath)
        .then(alreadyExists => {
            if (alreadyExists) {
                webDavClient.createReadStream(filePath).pipe(response);
            } else {
                response.status(404);
                return {error: 'There is no such file'};
            }
        })
        .then(message => message ? response.json(message) : null)
        .catch(err => response.status(400).json({error: err.toString()}));
});

app.post('/del/:name', (request, response) => {
    const filePath = '/' + request.params.name;
    webDavClient.exists(filePath)
        .then(alreadyExists => {
            if (alreadyExists) {
                return webDavClient.deleteFile(filePath).then(() => ({message: 'File\'s been removed'}));
            } else {
                response.status(404);
                return {error: 'There is no such file'};
            }
        })
        .then(message => response.json(message))
        .catch(err => response.status(400).json({error: err.toString()}));
});

app.post('/copy/:source/:destination', (request, response) => {
    const sourceFilePath = '/' + request.params.source;
    const destinationFilePath = '/' + request.params.destination;
    webDavClient.exists(sourceFilePath)
        .then(alreadyExists => {
            if (alreadyExists) {
                return webDavClient.copyFile(sourceFilePath, destinationFilePath).then(() => ({message: 'File\'s been copied'}));
            } else {
                response.status(404);
                return {error: 'There is no such source file'};
            }
        })
        .then(message => response.json(message))
        .catch(err => response.status(400).json({error: err.toString()}));
});

app.post('/move/:source/:destination', (request, response) => {
    const sourceFilePath = '/' + request.params.source;
    const destinationFilePath = '/' + request.params.destination;
    webDavClient.exists(sourceFilePath)
        .then(alreadyExists => {
            if (alreadyExists) {
                return webDavClient.moveFile(sourceFilePath, destinationFilePath).then(() => ({message: 'File\'s been moved'}));
            } else {
                response.status(404);
                return {error: 'There is no such source file'};
            }
        })
        .then(message => response.json(message))
        .catch(err => response.status(400).json({error: err.toString()}));
});

app.listen(config.server.port, () => {
    console.log(`Listening to http://${config.server.host}:${config.server.port}/`);
});
