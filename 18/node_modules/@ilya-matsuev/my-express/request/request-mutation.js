const { parse } = require('fast-xml-parser');
const { getMoveFileFunc } = require('./../utils');


function getBody(request, requestBody) {
    let body = '';
    let header = request.headers['content-type'] || '';
    if (header.includes('application/json')) {
        body = JSON.parse(requestBody);
    } else if (header.includes('application/xml')) {
        body = parse(requestBody, {
            attributeNamePrefix : "",
            ignoreAttributes : false
        });
    } else {
        body = requestBody;
    }
    return body;
}

function getHeaders(request) {
    return () => request.headers;
}

function getHeader(request) {
    return headerName => request.headers[headerName.toLowerCase()];
}

function getRequestQueryParams(url) {
    let params = {};
    const hasParams = url.split('?').length > 1;
    if (hasParams) {
        const paramPairs = url.split('?')[1].split('&').map(pair => {
            let parts = pair.split('=');
            return {name: parts[0], value: parts[1]};
        });
        paramPairs.forEach(pair => {
            params[pair.name] = pair.value;
        });
    }
    return params;
}

function getUploadedFiles(request) {
    let contentTypeHeader = request.getHeader('Content-Type');
    if (contentTypeHeader && contentTypeHeader.includes('multipart/form-data')) {
        const files = {};
        const BOUNDARY_PARAM = 'boundary=';
        const LINE_BREAK = '\r\n';

        let boundary = contentTypeHeader.substring(contentTypeHeader.indexOf(BOUNDARY_PARAM) + BOUNDARY_PARAM.length);

        let parts = request.body.split(new RegExp(`-+${boundary}-*`))
            .filter(part => part && part.replace(LINE_BREAK, ''))
            .map(part => part.replace(/^\s+|\s$/g, ''));

        let separator = LINE_BREAK + LINE_BREAK;
        parts.forEach(part => {
            let file = {};
            let separatorPosition = part.indexOf(separator);

            part.substring(0, separatorPosition)
                .split(/;|(\r\n)/)
                .filter(part => part && part.replace(LINE_BREAK, ''))
                .map(field => {
                    let pair = field.split(/[=:]/);
                    let fieldName = pair.shift().trim().toLowerCase();
                    file[fieldName] = pair.pop().replace(/"/g, '').trim();
                });

            file.content = part.substring(separatorPosition + separator.length);
            file.mv = getMoveFileFunc(file.content);

            let sameNameFile = files[file.name];
            if (sameNameFile) {
                if (Array.isArray(sameNameFile)) {
                    files[file.name].push(file);
                } else {
                    files[file.name] = [sameNameFile, file];
                }
            } else {
                files[file.name] = file;
            }
        });
        return files;
    }
}

module.exports = (request, additionalInfo) => {
    request.body = getBody(request, additionalInfo.body);

    request.getHeaders = getHeaders(request);
    request.getHeader = getHeader(request);

    request.query = getRequestQueryParams(request.url);
    request.params = additionalInfo.variables;
    request.files = getUploadedFiles(request);
};
