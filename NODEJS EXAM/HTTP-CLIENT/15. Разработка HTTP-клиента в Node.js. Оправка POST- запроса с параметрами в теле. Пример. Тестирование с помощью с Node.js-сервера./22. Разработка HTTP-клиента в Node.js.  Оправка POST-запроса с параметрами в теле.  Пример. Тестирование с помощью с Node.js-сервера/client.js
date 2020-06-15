const http = require('http');

let obj = {
    name : "diana",
    lastName : "agapkina"
};

let options = {
    hostname : 'localhost',
    port : 3000,
    path : '/',
    method : 'POST'
};

let data = '';
const request = http.request(options, (response) => {
    response.on('data', chunk => {
        data += chunk;
    });

    response.on('end', () => {
        console.log(data);
    });
});
request.write(JSON.stringify(obj));
request.end();
