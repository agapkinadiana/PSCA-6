const TEST_ENTRY_NAME = 'hset-hget-test';

module.exports = (client, hgetCount = 10000, hsetCount = 10000) => {
    Promise.resolve()
        .then(() => runHSetQueries(client, hsetCount))
        .then(() => runHGetQueries(client, hgetCount));
    /*runHGetQueries(client, incrCount);
    runHSetQueries(client, decrCount);*/
};

//HSET ключ поле значение — Добавляет в хэш поле и значение. Если такого ключа не существовало, он будет добавлен.
//В случае, если такое поле в хэше уже существует, оно будет перезаписано.
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

//HGET ключ поле значение — Возвращает значение, которое ассоциировано с полем в хэше
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
