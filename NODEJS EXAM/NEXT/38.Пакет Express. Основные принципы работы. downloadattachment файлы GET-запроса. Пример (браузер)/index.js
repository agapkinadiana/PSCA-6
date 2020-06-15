const express = require('express');
const fs = require('fs');
const app = express();

app.get('/download', (request, response)=>{
    console.log('download');
    response.download('./image.jpg', 'image.jpg')
});

app.get('/attachment', (request, response)=>{
    console.log('attachment');
    response.attachment('./image.jpg'); //добавить заголовок
    let readImage = fs.ReadStream('./image.jpg');
    readImage.pipe(response);
});

app.listen(3000);
console.log('Server start http://localhost:3000/')