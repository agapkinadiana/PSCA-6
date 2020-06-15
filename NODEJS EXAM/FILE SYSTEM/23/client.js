var http = require('http');

let options = {
    host: 'localhost',
    path: '/',
    port: 3000,
    method: 'GET',
    headers: {
        'Content-Type': 'text/plain'
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
request.end();