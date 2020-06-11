const passportHttp = require('passport-http');

const users = require('./../secure/users') || [];

module.exports = new passportHttp.BasicStrategy({}, (username, password, done) => {
    const targetUser = users.find(user => user.username === username && user.password === password);
    if (targetUser) {
        return done(null, targetUser);
    } else {
        return done(null, false, {message: 'Such user doesn\'t exist'});
    }
});
