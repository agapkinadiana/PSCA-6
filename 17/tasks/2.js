
module.exports = (client, setCount = 10000, getCount = 10000, delCount = 10000) => {
    Promise.resolve()
        .then(() => runSetQueries(client, setCount))
        .then(() => runGetQueries(client, getCount))
        .then(() => runDelQueries(client, getCount));
    /*runSetQueries(client, getCount);
    runGetQueries(client, getCount);
    runDelQueries(client, delCount);*/
};

function runSetQueries(client, count) {
    let start = Date.now();
    for (let i = 0; i < count; i++) {
        const setValue = `set-${i}`;
        client.set(setValue, setValue, () => {
            if (i + 1 === count) {
                console.log(`${count} set-queries have performed in ${Date.now() - start} ms`);
            }
        });
    }
}

function runGetQueries(client, count) {
    let start = Date.now();
    for (let i = 0; i < count; i++) {
        const getName = `set-${i}`;
        client.get(getName, () => {
            if (i + 1 === count) {
                console.log(`${count} get-queries have performed in ${Date.now() - start} ms`);
            }
        });
    }
}

function runDelQueries(client, count) {
    let start = Date.now();
    for (let i = 0; i < count; i++) {
        const delName = `set-${i}`;
        client.del(delName, () => {
            if (i + 1 === count) {
                console.log(`${count} del-queries have performed in ${Date.now() - start} ms`);
            }
        });
    }
}
