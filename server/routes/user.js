let router=require('express').Router()
let userController=require('../controller/user')
let{verifyToken}=require('../controller/auth')

//HOME PAGE
router.get('/',userController.getAllProducts)

//USER CART
router.get('/cart',verifyToken,userController.getCartitems)

router.get('/add-to-cart/:id',verifyToken,userController.addToCart)

router.get('/delte-cart-product/:id',verifyToken,userController.deleteCartproduct,)

















module.exports = router;