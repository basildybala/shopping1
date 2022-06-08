let router=require('express').Router()
let userController=require('../controller/user')
let{verifyToken}=require('../controller/auth')

router.get('/cart',)
router.get('/add-to-cart/:id',verifyToken,userController.addToCart)
router.get('/delte-cart-product/:id',)

















module.exports = router;