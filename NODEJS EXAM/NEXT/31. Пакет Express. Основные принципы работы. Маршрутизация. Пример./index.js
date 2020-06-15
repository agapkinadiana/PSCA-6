const express = require("express");
const app = express();

app.get('/', (req, res) => {
    console.log("GET");
    res.send("<h2>GET</h2>");
});

app.post('/', (req, res) => {
    console.log("POST");
    res.send("<h2>POST</h2>");
});

app.put('/', (req, res) => {
    console.log("PUT");
    res.send("<h2>PUT</h2>");
});

app.delete('/', (req, res) => {
    console.log("DELETE");
    res.send("<h2>DELETE</h2>");
});

var server = app.listen(3000);
