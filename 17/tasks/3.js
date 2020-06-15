const TEST_ENTRY_NAME = 'incr-decr-test';

//INCR / DECR
// Инкремент / декримент. Если значение ключа integer (хотя в базе храниться все равно строка) можно увеличить или уменьшить значение на 1.
// Если использовать команду INCR с несуществующем значением то создаться новый ключ со значением 1.
module.exports = (client, incrCount = 10000, decrCount = 10000) => {
    Promise.resolve()
        .then(() => client.set(TEST_ENTRY_NAME, 0))
        .then(() => runIncrQueries(client, incrCount))
        .then(() => runDecrQueries(client, decrCount));
    /*client.set(TEST_ENTRY_NAME, 0);
    runIncrQueries(client, incrCount);
    runDecrQueries(client, decrCount);*/
};

function runIncrQueries(client, count) {
    let start = Date.now();
    for (let i = 0; i < count; i++) {
        client.incr(TEST_ENTRY_NAME, () => {
            if (i + 1 === count) {
                console.log(`${count} incr-queries have performed in ${Date.now() - start} ms`);
            }
        });
    }
}

function runDecrQueries(client, count) {
    let start = Date.now();
    for (let i = 0; i < count; i++) {
        client.decr(TEST_ENTRY_NAME, () => {
            if (i + 1 === count) {
                console.log(`${count} decr-queries have performed in ${Date.now() - start} ms`);
            }
        });
    }
}
