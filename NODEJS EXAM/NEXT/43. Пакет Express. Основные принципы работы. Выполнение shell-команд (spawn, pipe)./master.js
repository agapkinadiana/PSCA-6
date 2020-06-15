const fs = require('fs');
const child_process = require('child_process');

async function main() {
    for (var i = 0; i < 3; i++) {
        //запускает новый процесс
        //https://webformyself.com/node-js-masshtabirovanie-prilozheniya-s-pomoshhyu-child_process/
        var workerProcess = child_process.spawn('node', ['support.js', i]);

        process.stdin.pipe(workerProcess.stdout);

        // workerProcess.stdout.on('data', function (data) {
        //     console.log('stdout: ' + data);
        // });

        for await (const data of workerProcess.stdout) {
            console.log(`stdout from the child: ${data}`);
        };

        workerProcess.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });

        workerProcess.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });
    }
}

main();

