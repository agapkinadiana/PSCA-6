const tsRoute = require('express').Router();

const data = require('./../db/data') || [];

tsRoute.get('/', (request, response) => {
    response.json(data);
});

tsRoute.post('/', (request, response) => {
    const {id, name, phone} = request.body;
    const newTs = {id, name, phone};
    data.push(newTs);
    response.json(newTs);
});

tsRoute.put('/', (request, response) => {
    const {id, name, phone} = request.body;
    const newTs = {id, name, phone};
    const targetTs = data.find(ts => ts.id === newTs.id);
    if (id && targetTs) {
        targetTs.name = name;
        targetTs.phone = phone;
        response.json(targetTs);
    } else {
        response.status(400).end();
    }
});

tsRoute.delete('/', (request, response) => {
    const targetTsIndex = data.findIndex(ts => ts.id === request.query.id);
    if (request.query.id && targetTsIndex !== -1) {
        response.json(data.find(ts => ts.id === request.query.id));
        data.splice(targetTsIndex);
    } else {
        response.status(400).end();
    }
});



module.exports = tsRoute;
