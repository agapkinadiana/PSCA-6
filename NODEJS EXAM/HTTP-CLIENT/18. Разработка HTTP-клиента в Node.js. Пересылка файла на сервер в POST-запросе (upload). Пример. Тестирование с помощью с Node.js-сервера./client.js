var http = require('http');
const fs = require ('fs');

let body = fs.readFileSync('./MyFile.txt');

let options = {
    host: 'localhost',
    path: '/upload',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

const request = http.request(options, (response)=>{
    console.log('method: ', request.method);
    console.log('response: ', response.statusCode);
    console.log('statusMessage: ', response.statusMessage);

    let data ='';
    response.on('data', (chunk)=>{
        console.log('data: body: ', data += chunk.toString('utf-8'));
    });
});

request.on('error', (e)=>{console.log('error: ', e.message);});
request.write(body);
request.end();