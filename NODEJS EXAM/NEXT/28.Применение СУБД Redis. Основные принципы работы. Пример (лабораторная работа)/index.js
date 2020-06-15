const redis = require('redis');

const client = redis.createClient({
    "host": "redis-12854.c92.us-east-1-3.ec2.cloud.redislabs.com",
    "port": 12854,
    "no_ready_check": true,
    "auth_pass": "h11ifzpM7TgQFrJYHABoJJWwpno8Lag2"
});
client.on('connect', function () {
    console.log('Connect with data base');

    client.set('key1', 'value1');
    client.set('key2', 'value2');
    client.set('key3', 'value3');

    client.get('key2', function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    });
    client.get('key3', function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    });
    client.del('key1', function (err, delResult) {
        if (err){
            console.log(err);
        }
        else{
            console.log(delResult);
        }
    });
    client.get('key1', function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    });
});
