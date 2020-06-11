const express = require('express');
const homeRoute = express.Router();
const Users = require('./../models/users');

homeRoute.get('/', (request, response) => {
    const {firstName, lastName} = request.query;
    const user = Users.getUserByFirstName(firstName);
    if (!user || user.lastName !== lastName) {
        response.redirect('/login');
    } else {
        response.sendFile('home.html', {root: './views'});
    }
});

homeRoute.get('/user/:name', (request, response) => {
    const user = Users.getUserByFirstName(request.params.name);
    if (user) {
        response.json(user);
    } else {
        response.status(400).end();
    }
});

module.exports = homeRoute;
