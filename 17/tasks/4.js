const TEST_ENTRY_NAME = 'hset-hget-test';

module.exports = (client, hgetCount = 10000, hsetCount = 10000) => {
    Promise.resolve()
        .then(() => runHSetQueries(client, hsetCount))
        .then(() => runHGetQueries(client, hgetCount));
    /*runHGetQueries(client, incrCount);
    runHSetQueries(client, decrCount);*/
};

function runHSetQueries(client, count) {
    let start = Date.now();
    for (let i = 0; i < count; i++) {
        client.hset(TEST_ENTRY_NAME, i.toString(), i.toString(), () => {
            if (i + 1 === count) {
                console.log(`${count} hset-queries have performed in ${Date.now() - start} ms`);
            }
        });
    }
}

function runHGetQueries(client, count) {
    let start = Date.now();
    for (let i = 0; i < count; i++) {
        client.hget(TEST_ENTRY_NAME, i.toString(), i.toString(), () => {
            if (i + 1 === count) {
                console.log(`${count} hget-queries have performed in ${Date.now() - start} ms`);
            }
        });
    }
}
