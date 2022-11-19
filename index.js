const express=require('express');
const app=express();
const router=express.Router();
const port=3000;
const employees=require('./controller/employeeController')
const path=require('path')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate');

app.engine('ejs',ejsMate);
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'));

//view all
router.route('/')
.get(employees.getall)
router.route('/employee')
.get(employees.getall)

//Show specific
router.route('/employee/show/:id')
.get(employees.getEmployee)
.delete(employees.deleteEmployee)


//create new Employee
router.route('/employee/new')
.get(employees.createEmployee)
.post(employees.insertData)
//edit router
router.route('/employee/edit/:id')
.get(employees.ShoweditEmployee)
.put(employees.editData)



app.use(router);
app.listen(port,()=>{

    console.log('Listening on port :' +port)
})
