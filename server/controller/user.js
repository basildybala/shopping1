
let db=require('../database/connection')

var objectId = require('mongodb').ObjectId




module.exports.addToCart=async(req,res)=>{
    try {
        let proId=req.params.id
        let userId=req.user.id
       let  productObj={
            product:objectId(proId),
            qty:1
        }

        let cart =await db.get().collection('cart').findOne({user:objectId(userId)}).then().catch((err)=>{console.log(err);})
        
        //Check User have cart 
        if (cart) {
            let isItemAdded = await cart.products.find(
                (c) => c.product == proId
            );
            
                //====Check product is already exist 
            if (isItemAdded) {
                //If product Is exist Inc Qty
                let Cart = await db.get().collection('cart').findOneAndUpdate(
                    { user: objectId(userId), "products.product": objectId(proId)},
                    {
                      $inc: { "products.$.qty": 1 },
                    }
                  );
                  console.log(Cart);
                  res.send(Cart)
                console.log('Product');
            } else {
                //No Product then Psuh A Product
               let cart=await db.get().collection('cart').findOneAndUpdate({ user: objectId(userId) },
                {
                    $push: { products: productObj }
                }).then().catch(e=>{console.log(e);}) 
                console.log(cart);
                res.send(cart)
            }
        } else {
            //No Cart Then Create a CArt
            userCart={
                user:objectId(userId),
                products:[productObj]
                
            }
            let cart =await db.get().collection('cart').insertOne(userCart).then().catch((err)=>{console.log(err);})
            console.log(cart);
            res.send(cart)
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports.getCartitems=async(req,res)=>{
    try {
        let userId=req.user.id
        let getCart=await db.get().collection('cart').aggregate([
            {
                $match:{user:objectId(userId)}
            },
            {
                $unwind:'$products'
            },
            {
                $project:{
                    product:'$products.product',
                    qty:'$products.qty'
                }
            },
            {
                $lookup: {
                  from: "products",
                  localField: "product",
                  foreignField: "_id",
                  as: "product",
                },
            },
            {
                $project:{
                    product:1,
                    qty:1,
                    product: { $arrayElemAt: ["$product", 0] },
                }
            }
            

        ]).toArray()
        console.log(getCart);
        res.json(getCart)
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteCartproduct=async (req,res)=>{
    try {
        //Delete Product using
        let userId=req.user.id
        // let cartId=req.body.cartId
        let proId=req.params.id
        console.log(userId,proId);
        let cart = await db.get().collection('cart').updateOne({ user: objectId(userId) },
            {
                $pull: { products: { product: objectId(proId) } }
            }
        ).then().catch(e=>{console.log(e);})
        console.log(cart);
        res.json({cart})
    } catch (error) {
        console.log(error);
    }
}

module.exports.getAllProducts=async(req,res)=>{
    try {
        //Find All Products
        let products=await db.get().collection('products').find().toArray().then().catch(e=>{console.log(e);})
        res.json(products)
        console.log(products);
    } catch (error) {
        console.log(error);
    }
}