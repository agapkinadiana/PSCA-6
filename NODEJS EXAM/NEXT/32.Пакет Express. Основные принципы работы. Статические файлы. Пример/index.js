const express = require('express');
const app = express();

//app.use(express.static(__dirname + '/static'));

app.use('/static', express.static('static'));

app.use((req, res, next) =>{
    console.log('Handler 02');
    next();
});

app.listen(3000, ()=>
console.log('Start server http://localhost:3000/static'));