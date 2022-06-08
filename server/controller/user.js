
let db=require('../database/connection')
let jwt=require('jsonwebtoken')




module.exports.addToCart=async(req,res)=>{
    try {
        let proId=req.params.id
        let userId=req.user.id
        

        let cart =await db.get().collection('cart').findOne({user:userId}).then().catch((err)=>{console.log(err);})
        console.log(cart);

        if (cart) {
            console.log('cart');
        } else {
            userCart={
                user:userId,
                products:{
                    id:proId,
                    qty:1,
                }
                
            }

            let cart =await db.get().collection('cart').insertOne(userCart).then().catch((err)=>{console.log(err);})
            console.log(cart);
            res.send(cart)

        }

    } catch (error) {
        console.log(error);
    }
}