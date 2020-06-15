const app = require('express')();
const bodyParser = require('body-parser');

// Для обработки входящих запросов с Content-Type в JSON формате используется внешний модуль body-parser,
// дополняющий Express как Middleware. Все, что он делает - парсит входящее тело, если это JSON и представляет как
// JS объект "body" в объекте request
app.use(bodyParser.json());

app.post('/', (request, response) => {
// Получаем JSON как JS объект
    const incomeJSONBody = request.body;
    console.log(request.body)
// Формируем новый JS объект
    const outcomeJSONBody = {request: incomeJSONBody};
// Отправляем JS объект как JSON с помощью метода json()
// Можно то же самое сделать вручную, прикрепив нужный заголовок (application/json)
// и отправив JSON в текстовом виде в теле ответа
    response.json(outcomeJSONBody);
});

app.listen(3000);
console.log('Server start http://localhost:3000/');
