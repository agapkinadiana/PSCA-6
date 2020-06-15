const redis = require('redis');
const config = require('./config');

const client = redis.createClient(config.db);

client.on('connect', () => {
    console.log('Redis connection has been created');

    Promise.resolve()
        //.then(() => require('./tasks/2')(client))
        //.then(() => require('./tasks/3')(client))
        //.then(() => require('./tasks/4')(client))
        .then(() => require('./tasks/5')(redis, config.db));
});
