const mysql=require('mysql');

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employee_db'
});

 con.connect((err)=>{
    if(!err)
    console.log('DB Connected')
    else
    console.log('DB connection Failed \n error: '+JSON.stringify(err,undefined,2))
});

module.exports=con

