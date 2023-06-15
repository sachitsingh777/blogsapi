const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const userRouter=express.Router()
 userRouter.get("/",(req,res)=>{
    const user=UserModel.find()
    res.send("user")
 })
userRouter.post("/register",async(req,res)=>{
      const {username,email,avatar,password}=req.body
    try{
        bcrypt.hash(password, 5, async(err, hash) =>{
           const user=new UserModel({username,email,avatar,password:hash})
           await user.save()
           res.send("registration succesfull")
        });
    }
    catch(err){
        res.send("not register")
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=UserModel.findOne({email})
  try{
      if(user){
         
        bcrypt.compare(password,user.password, async(err, result)=>{
            if(result){
                var token = jwt.sign({ username: user.username }, 'mock13');
                res.status(200).send({"msg":"login succesfull","token":token})
            }else{
                res.status(200).send({"msg:login":"succesfull","token":token})
            }
        });
    }
   
    } catch(error){
        res.status(400).send({"err":error.message})
    }
   
})

module.exports={userRouter}

