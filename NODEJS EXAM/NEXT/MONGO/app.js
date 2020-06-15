const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const userScheme = new Schema({name: String, age: Number}, {versionKey: false});
const User = mongoose.model("User", userScheme);

app.use(express.static(__dirname + "/public"));

dbPassword = 'mongodb+srv://Diana:'+ encodeURIComponent('DeWWsh123') + '@bstucluster-x0qcu.mongodb.net/mongo_task?retryWrites=true';

mongoose.connect(dbPassword, { useNewUrlParser: true }, (err) => {
    if(err) return console.log(err);
    app.listen(3000, () => {
        console.log("Сервер ожидает подключения...");
    });
});

app.get("/api/users", (req, res) => {

    User.find({}, (err, users) => {

        if(err) return console.log(err);
        res.send(users)
    });
});

app.get("/api/users/:id", (req, res) => {

    const id = req.params.id;
    User.findOne({_id: id}, (err, user) =>{

        if(err) return console.log(err);
        res.send(user);
    });
});

app.post("/api/users", jsonParser, (req, res) => {

    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = new User({name: userName, age: userAge});

    user.save((err) => {
        if(err) return console.log(err);
        res.send(user);
    });
});

app.delete("/api/users/:id", (req, res) => {

    const id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {

        if(err) return console.log(err);
        res.send(user);
    });
});

app.put("/api/users", jsonParser, (req, res) =>{

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const newUser = {age: userAge, name: userName};

    User.findOneAndUpdate({_id: id}, newUser, {new: true}, (err, user) => {
        if(err) return console.log(err);
        res.send(user);
    });
});
