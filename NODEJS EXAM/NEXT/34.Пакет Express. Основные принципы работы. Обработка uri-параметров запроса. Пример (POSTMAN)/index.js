const express = require('express');
const app = express();

app.get('/api/:x/:y', (request, response)=>{
    console.log('uri params = ', request.params);
    console.log('uri params, x = ', request.params.x);
    console.log('uri params, y = ', request.params.y);

    response.send('Получаем параметры uri');
});


app.listen(3000);
console.log('Server start http://localhost:3000/api/');