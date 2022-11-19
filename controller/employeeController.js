const { query } = require('express');
const con=require('../database')


//fetch all employee
const getall=(async(req,res,next)=>{
 const sql=await 'SELECT * FROM EMPLOYEE';
 con.query(sql,(err,result,field)=>{
  if(!err){
    res.render('home',{data:result})
  }
  else{
    console.log(err);
  }
 })
});

//get specific employee
const getEmployee=(async(req,res)=>{
   await con.query('Select * from Employee where EmpID=?',[req.params.id],(err,result,field)=>{
        if(!err){
        res.render('show',{data:result})
        }
        else{
            res.render('show',{data:''})
        }
    })

}
)
//create new employee
const createEmployee=((req,res)=>{
  res.render('new')
})
const insertData=(async(req,res)=>{
  const sql='INSERT INTO `employee`(`Name`, `EmpCode`, `Salary`) VALUES(?,?,?)'
  const info=req.body;
  const value=[[info.Name],[info.EmpCode],[info.Salary]];
  
  
  con.query(sql,value,(err,result)=>{
      if (err) throw err;
      //console.log("Number of records inserted: " + result.affectedRows);
      res.redirect('/employee');
      
    });

})




//delete employee
const deleteEmployee=(async(req,res)=>{

await con.query("DELETE FROM `employee` WHERE EmpID=?",[req.params.id],(err,result,field)=>{
  if(!err){
   res.redirect('/employee')
  }
  else{
    console.log(err);
  }
})

})

//show edit employee
const ShoweditEmployee=(async(req,res)=>{
  await con.query('Select * from Employee where EmpID=?',[req.params.id],(err,result,field)=>{
       if(!err){
       res.render('edit',{data:result})
       }
       else{
           res.render('show',{data:''})
       }
   })

}
)

const editData=((req,res)=>{
  const info=req.body;
  const sql="UPDATE `employee` SET `Name`=?,`EmpCode`=?,`Salary`=? WHERE EmpID=?"
  const value=[[info.Name],[info.EmpCode],[info.Salary],[req.params.id]];
  con.query(sql,value,(err,result,field)=>{
    if(!err){
      res.redirect(`/employee/show/${req.params.id}`);
      
    }
    console.log(err)
    
      })
      

  



})

module.exports={
  getall,
  getEmployee,
  createEmployee,
  deleteEmployee,
  ShoweditEmployee,
  editData,
  insertData
};