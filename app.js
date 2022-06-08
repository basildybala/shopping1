let express =require('express');
let app=express()
let mongoClient = require("mongodb").MongoClient;
let morgan = require('morgan');
let userRoutes=require('./server/routes/user');
let adminRoutes=require('./server/routes/admin');
var db=require('./server/database/connection')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Log Request
app.use(morgan('tiny'));

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