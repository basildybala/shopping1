let router=require('express').Router()
let adminController=require('../controller/admin')
let path=require('path');
let{verifyToken}=require('../controller/auth')
const multer=require('multer');

//MULTER SETUP
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



//ADMIN PAGES
router.post('/add-product',upload.array('productimg'),adminController.addProduct)


//USER REGISTER AND LOGIN
router.post('/register-user',adminController.regUser)

router.post('/login-user',adminController.loginUser)

















module.exports = router;