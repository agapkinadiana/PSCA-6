
module.exports = (redis, clientConfig) => {
    const CHANNEL_NAME = 'channel';
    const publisher = redis.createClient(clientConfig);
    const subscriber = redis.createClient(clientConfig);

    subscriber.on('unsubscribe', channel => console.log(`Client has been unsubscribed from the '${channel}' channel`));
    subscriber.on('subscribe', channel => console.log(`Client has been subscribed to the '${channel}' channel`));
    subscriber.on('message', (channel, message) => console.log(`Client has received a message: ${message}. From ${channel}`));

    subscriber.subscribe(CHANNEL_NAME);

    let sendMessageInterval = setInterval(() => {
        publisher.publish(CHANNEL_NAME, 'The message for the channel');
    }, 1000);

    setTimeout(() => {
        subscriber.unsubscribe(CHANNEL_NAME);
        clearInterval(sendMessageInterval);
        publisher.quit();
        subscriber.quit();
    }, 5000);
};
