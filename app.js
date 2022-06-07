let express =require('express');
let app=express()
let mongoClient = require("mongodb").MongoClient;
let cookieParser=require('cookie-parser');
let morgan = require('morgan');
let session= require('express-session');
let userRoutes=require('./server/routes/user');
let adminRoutes=require('./server/routes/admin');
var db=require('./server/database/connection')


//Sent Json Files In Client Body
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Log Request
app.use(morgan('tiny'));
app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:true,
    saveUninitialized:true  
}))
//
app.use(cookieParser())
app.use('/public', express.static('public'))

db.connect((err) => {
    if (err) throw err;
    console.log("Database Connected");
});







app.use('/',userRoutes)
app.use('/admin',adminRoutes)





















app.listen(3002,()=>{
console.log('Server Running 3002');
})