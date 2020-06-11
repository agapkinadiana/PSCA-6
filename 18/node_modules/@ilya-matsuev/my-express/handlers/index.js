const { readdir, stat } = require('fs');

const utils = require('./../utils');
const requestMutation = require('../request/request-mutation');
const responseMutation = require('../response/response-mutation');


const RequestUrlVariables = new Map();

const GetHandlers = new Map();
const PostHandlers = new Map();
const PutHandlers = new Map();
const DeleteHandlers = new Map();

const Handlers = {
    GET: GetHandlers,
    POST: PostHandlers,
    PUT: PutHandlers,
    DELETE: DeleteHandlers
};


function getHandlerByRegexKey(handlers, url) {
    let urlHandlerMatches = [...handlers].find(([key]) => url.match(key));
    if (urlHandlerMatches) {
        return urlHandlerMatches[1];
    }
}

function getUrlVariables(url) {
    let requestUrlMatches = [...RequestUrlVariables].find(([key]) => url.match(key));
    if (requestUrlMatches) {
        let originalUrlPaths = requestUrlMatches[0].split(/\^\/|\/|\$/).filter(path => path);
        let urlPaths = url.split('/').filter(path => path !== '');
        let variableNames = requestUrlMatches[1].map(name => name.slice(1));

        let variables = {};

        for (let i = 0, j = 0; i < urlPaths.length; i++) {
            if (urlPaths[i] !== originalUrlPaths[i]) {
                variables[variableNames[j++]] = urlPaths[i];
            }
        }
        return variables;
    }
}

function registerDirectoryHandlers(path, urlPath) {
    readdir(path, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(file => {
            let newPath = `${path}/${file}`;
            let newUrlPath = `${urlPath}/${file}`;
            stat(newPath, (statErr, stats) => {
                if (stats.isDirectory()) {
                    registerDirectoryHandlers(newPath, newUrlPath);
                } else if (stats.isFile()) {
                    self.addUrlHandler('GET', newUrlPath, (request, response) => {
                        response.sendFile(newPath);
                    });
                }
            });
        });
    });
}


const self = module.exports = {
    requestHandler(request, response) {
        let requestBody = '';
        request.on('data', chunk => requestBody += chunk);
        request.on('end', () => {
            let handlers = Handlers[request.method];
            if (handlers) {
                let originalUrl = utils.getClearUrl(request.url);
                let handler = getHandlerByRegexKey(handlers, originalUrl);
                if (handler) {
                    requestMutation(request, {
                        body: requestBody,
                        variables: getUrlVariables(originalUrl)
                    });
                    responseMutation(response);
                    handler(request, response);
                } else {
                    response.statusCode = 404;
                    response.end();
                }
            } else {
                response.statusCode = 405;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(
                    {error: 'The requested method isn\'t supported yet'},
                    null,
                    '  '
                ));
            }
        });
    },

    addUrlHandler(method, url, callback) {
        Handlers[method].set(utils.getUrlRegex(url, RequestUrlVariables), callback);
    },

    addUniversalUrlHandler(url, callback) {
        Object.keys(Handlers).forEach(method => self.addUrlHandler(method, url, callback));
    },

    addStaticDirHandler(path) {
        registerDirectoryHandlers(path, '');
    }
};
