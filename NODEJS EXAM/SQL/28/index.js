const sql = require('mssql');
const http = require('http');
const config = {
    user: "sa",
    password: "sa",
    server: "DIANAAGAPKI0D5D\\SQLEXPRESS",
    database: "lab14node",
    pool: {
        max:10, min:0, softIdleTimeoutMillis:5000, idleTimeoutMillis: 10000
    },
    enableArithAbort: "true"
};
let callGet_Pulpits = (f,_cd)=>{
    const cd = _cd?_cd:(err,result)=>{
        console.log('default cd')
    }
    const rq = new sql.Request()
    rq.input('f', sql.NChar(10), f);
    rq.execute('get_pulpits', (err,result)=>{
        processing_result(err,result);
        cd(err,result)
    })
    rq.on('info', message =>{console.log('info:', message)})
};

let processing_result = (err,result)=>{
    if(err) console.log('processing_result err', err);
    else{
        console.log('Count string:', result.rowsAffected[0]);
        for(let i = 0; i< result.rowsAffected[0]; i++){
            let str = '---';
            for(key in result.recordset[i]){
                str += `${key} = ${result.recordset[i][key]}`;
                console.log(str)
            }
        }
    }
}
sql.connect(config,err =>{
     if(err)
         console.log('error ',err.code);
     else{
         console.log(' connect ')
         callGet_Pulpits('ИДиП  ',h);
     }
 })


/*let server = http.createServer();
server.listen(3000);
server.on("request", (req, res) => {
    const pool = new mssql.ConnectionPool(config, err => {
        if (err) {
            console.log("Database connection failed: ", err.code)
        } else {
            console.log(' connect ')
            callGet_Pulpits('ИДиП  ',h);
        }
    });
});*/
h = (err, result)=>{
    if(err)console.log('error ',err);
    else console.log(' Успешно' , result.rowsAffected[0]);
    process.exit(0);
}