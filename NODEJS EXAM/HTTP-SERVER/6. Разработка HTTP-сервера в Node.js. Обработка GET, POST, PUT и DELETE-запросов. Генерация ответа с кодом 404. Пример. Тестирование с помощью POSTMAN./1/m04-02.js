const util = require("util");
const ee = require("events");


const db_data = [
    {id: 1, name: "diasik",  bday: "2000-01-01"},
    {id: 2, name: "diasik2", bday: "2000-01-01"},
    {id: 3, name: "diasik3", bday: "2000-01-01"},
    {id: 4, name: "diasik4", bday: "2000-01-01"},
    {id: 5, name: "diasik5", bday: "2000-01-01"}
];

function DB(){
    this.get = ()=>{return db_data;};
    this.post = (r)=>{db_data.push(r);};  
    this.put = (r)=> {change(r)};
    this.delete = (r)=>{remove(r);}; 
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;

function remove(r){
    console.log("remove");
    for(let i = 0; i < db_data.length; i++){        
        if(db_data[i].id == r.id){
            db_data.splice(i,1);
        }
    }
}

function change(r){
    console.log("change");
    for(let i = 0; i < db_data.length; i++){        
        if(db_data[i].id == r.id){
            db_data[i].name = r.name;
            db_data[i].bday = r.bday;
        }
    }
}