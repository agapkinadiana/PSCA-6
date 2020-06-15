const express = require ('express');
const app = express();

app.get('/redirect01', (request, response)=>{
    console.log('Redirect 01');
    response.redirect('/redirect02');
});
app.get('/redirect02', (request, response)=>{
    console.log('Redirect 02');
    response.send('Redirect 02');
});
app.post('/redirect03', (request, response)=>{
    console.log('Redirect 03');
    response.redirect(308, '/redirect04');
});
app.post('/redirect04', (request, response)=>{
    console.log('Redirect 04');
    response.send('Redirect 04');
});

app.listen(3000,()=>{
    console.log('Server start http://localhost:3000/')
});