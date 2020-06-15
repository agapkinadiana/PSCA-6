const express = require('express');

const app = express();
const wasmCode = new Uint8Array([
    0,97,115,109,1,0,0,0,1,135,128,128,128,0,1,96,2,127,127,1,127,3,130,128,128,
    128,0,1,0,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,
    128,128,0,0,7,144,128,128,128,0,2,6,109,101,109,111,114,121,2,0,3,115,117,109
    ,0,0,10,141,128,128,128,0,1,135,128,128,128,0,0,32,1,32,0,106,11
])
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule, {});

app.get('/', (request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    response.end(wasmInstance.exports['sum'](3, 4).toString());
});

app.listen(3000);

//https://wasdk.github.io/WasmFiddle/
//
//int sum(int x, int y){return x+y;};
// выбери Code Buffer внизу и нажми Build сверху страницы