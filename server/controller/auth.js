const jwt=require("jsonwebtoken");


const verifyToken=(req, res, next) =>{
  console.log('Verify Token area');
  const usertoken=req.headers.authorization;
  
  if (usertoken){
    const token=usertoken.split(" ")[1];

    jwt.verify(token,'shop', (err, user) =>{
      if (err) res.json("Token is not valid!");
      req.user=user;
      
      next();
    });
   }else{
       console.log('Failed token');
    return res.send('Failed');
  }
};


module.exports={verifyToken }; 