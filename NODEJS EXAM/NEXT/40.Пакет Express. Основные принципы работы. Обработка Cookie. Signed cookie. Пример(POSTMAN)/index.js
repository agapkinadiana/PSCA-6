// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');
//
// const cookiesecret = '1234567890';
//
// app.use(cookieParser(cookiesecret));
//
// app.get('/', (request, response)=>{
//     let identifier = request.signedCookies.identifier;
//     console.log(identifier)
//     if(isFinite(identifier)) ++identifier; //Метод возвращает true, если передаваемое значение конечное число, в противном случае возвращаемое значение false.
//     else identifier = 0;
//
//     console.log('Identifier: ', identifier);
//    //signed - булевое значение, если true, то cookie-файл будет подписан.
//     response.cookie('Identifier', identifier, {signed:true}).send(`Identifier = ${identifier}`)
// });
//
// app.listen(3000,()=>{
//     console.log('Server start http://localhost:3000/')
// });

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Имеет 2 опциональных параметра:
// 1. Секрет для signed-cookie
// 2. Options
// Подробнее: https://expressjs.com/en/resources/middleware/cookie-..
app.use(cookieParser());

// Чтоб получить значение куки, сделай любой гет запрос на этот юрл
app.get('/', (request, response) => {
// Объект cookies содержит в себе все куки для этого домена, через него мы можем взять значение определенного куки по имени
    response.end('Your cookie value: ' + request.cookies['x-cookie-1']);
});

// Чтоб установить значение куки, сделай любой пост запрос на этот юрл
app.post('/', (request, response) => {
// Установить новый куки можем с помощью метода cookie(), указываем его имя первым параметром, потом значение
// Третий параметр опциональный, может содержать доп настройки для куки, например:
// 1. Время жизни (ms)
// 2. Параметр httpOnly (куки доступен только серверу?)
// Все опции в табличке тут: http://expressjs.com/en/5x/api.html#res.cookie
    response.cookie('x-cookie-1', 'test1', { maxAge: 900000, httpOnly: true });
    response.end('Cookie has been set');
});

app.listen(8000, () => {
    console.log('Listening to http://localhost:8000/');
});