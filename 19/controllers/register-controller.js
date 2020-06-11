const express = require('express');
const registerRoute = express.Router();
const Users = require('./../models/users');

registerRoute.get('/', (request, response) => {
    response.sendFile('register.html', {root: './views'});
});

registerRoute.post('/', (request, response) => {
    const {firstName, lastName} = request.body;
    const user = Users.createUser({firstName, lastName});
    if (user) {
        response.redirect(`/home?id=${user.id}&firstName=${user.firstName}&lastName=${user.lastName}`);
    } else {
        response.status(404).end();
    }
});

module.exports = registerRoute;
