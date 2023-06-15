const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headrs.authorization
    if(token){
        try{
            var decoded = jwt.verify(token.split(" ")[1], 'mock13');
            if(decoded){
                req.body.blogID=decoded.userID
                req.body.blogger=decoded.username
                next()
            }else{
                res.send({"msg":" login please"})
            }
        }catch(error){
        res.send({"err":error.message})
    }
    }else{
        res.send({"msg":" login please"})
    }
    
}
module.exports={auth}