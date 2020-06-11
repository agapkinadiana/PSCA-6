const { writeFile } = require('fs');


module.exports = {
    getUrlRegex : function (url, urlVariables) {
        let clearUrl = this.getClearUrl(url);
        let urlRegex = '';
        let variableNames = [];
        if (clearUrl.includes(':')) {
            let urlPaths = clearUrl.split('/');
            for (let i = 0; i < urlPaths.length; i++) {
                if (urlPaths[i].startsWith(':')) {
                    variableNames.push(urlPaths[i]);
                    urlPaths[i] = '[a-z0-9\.-]+';
                }
            }
            urlRegex = '^' + urlPaths.join('\/') + '$';
            urlVariables.set(urlRegex, variableNames);
        } else {
            urlRegex = '^' + clearUrl.replace('/', '\/') + '$';
        }
        return urlRegex;
    },

    getClearUrl : function (url) {
        let originalUrl = url.split('?')[0];
        if (originalUrl.length > 1 && originalUrl.lastIndexOf('/') === originalUrl.length - 1) {
            originalUrl = originalUrl.slice(0, -1);
        }
        return originalUrl;
    },

    getMoveFileFunc : function (data) {
        return path => {
            writeFile(path, data, err => {
                if (err) {
                    throw err;
                }
            });
        }
    }
};
