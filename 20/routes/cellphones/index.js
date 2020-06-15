const express = require('express');
const cellPhonesRoute = express.Router();
const cellPhonesModel = require('./../../db');

cellPhonesRoute.get('/', (request, response) => {
    response.render('index', {
      //  layout:'main',
        unlockOthers: true,
        phones: cellPhonesModel.getPhones()
    });
});

cellPhonesRoute.get('/add', (request, response) => {
    response.render('add', {
        unlockOthers: false,
        phones: cellPhonesModel.getPhones(),
        helpers: {goBack: () => 'window.location.href = \'/\''}
    });
});

cellPhonesRoute.get('/update', (request, response) => {
    response.render('update', {
        unlockOthers: false,
        phones: cellPhonesModel.getPhones(),
        targetPhone: cellPhonesModel.getPhoneById(request.query.id),
        helpers: {goBack: () => 'window.location.href = \'/\''}
    });
});

cellPhonesRoute.post('/add', (request, response) => {
    response.json(cellPhonesModel.addPhone(request.body));
});

cellPhonesRoute.post('/update', (request, response) => {
    response.json(cellPhonesModel.updatePhone(request.body));
});

cellPhonesRoute.post('/delete', (request, response) => {
    response.json(cellPhonesModel.deletePhone(request.body.id));
});

module.exports = cellPhonesRoute;
