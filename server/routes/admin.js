let router=require('express').Router()

let adminController=require('../controller/admin')
let path=require('path');
let{verifyToken}=require('../controller/auth')
const multer=require('multer');
const storage= multer.diskStorage({
 
    destination:function(req,file,cb){
     
    cb(null,"public/images/products/")
    },
    filename:function(req,file,cb){
      let ext= path.extname(file.originalname)
    cb(null,Date.now()+'-'+file.originalname)
    }
  }) 
  const upload=multer({storage:storage})


router.get('/',verifyToken,(req,res)=>{
    console.log('Admin Page');
})

router.post('/add-product',upload.array('productimg'),adminController.addProduct)
router.post('/register-user',adminController.regUser)
router.post('/login-user',adminController.loginUser)

router.get('/',(req,res)=>{
    console.log('Admin Page');
})















module.exports = router;