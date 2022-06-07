let bcrypt =require('bcrypt');
let db=require('../database/connection')
let jwt=require('jsonwebtoken')


exports.regUser=async(req,res)=>{

    try {

        req.body.password=await bcrypt.hash(req.body.password,10)
        let user= await db.get().collection('user').insertOne(req.body).then().catch((err)=>{console.log(err);})
        res.send(user)

        console.log(req.body);

         } catch (error) {
        console.log(error);
    }
    
}

exports.loginUser=async(req,res)=>{

    try {
        
        const user = await db.get().collection('user').findOne({name:req.body.name})
         !user && res.status(401).json("Wrong credentials!");
         if(user){
            bcrypt.compare(req.body.password,user.password).then((status)=>{
                if(status){
                    const token=jwt.sign(
                        {
                          id: user._id,
                          
                        },
                        'shop',
                        {expiresIn:"3d"}
                    );

                    console.log('Login Success');
                    res.status(200).json({token})
                    
                }else{
                    console.log('Login Failed');
                    
                }
            })
        }else{
            console.log('Login Faild');
            
        }
        
        // const hashedPassword = CryptoJS.AES.decrypt(
        // user.password,
        // process.env.PASS_SEC)

         } catch (error) {
        console.log(error);
    }
    
}
exports.addProduct=async(req,res)=>{
    try {
        let path = "";
        req.files.forEach(function (files, index, arr) {
        path = path + files.path + ",";
         });
         path = path.substring(0, path.lastIndexOf(","));
         var productimg = path.split(",");
         let final={...req.body,productimg}
       
        let products=await db.get().collection('products').insertOne(final).then().catch((err)=>{console.log(err);})
        res.send({products})
    } catch (error) {
        console.log(error);
    }
}

