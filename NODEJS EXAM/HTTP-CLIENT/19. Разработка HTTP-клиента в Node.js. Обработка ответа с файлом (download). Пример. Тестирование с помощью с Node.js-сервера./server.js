const http = require('http');
const fs = require('fs');
const server = http.createServer(function (request, response) {

    const filePath = request.url.substr(1);
    fs.readFile(filePath, function(error, data){
        if(error){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else response.end(data);
    });

}).listen(3000);
console.log('ruun');