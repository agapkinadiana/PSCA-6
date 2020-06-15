const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.get('/', (req, res)=>{
    res.render('index', {
        layout:'main',    //передаем index в main
        title: 'Handlebars',
        titlePage:'Handlebars Hello!'
    });
});

app.listen(3000, ()=>
    console.log('Start server http://localhost:3000'));
