const express=require("express")
const { BlogModel } = require("../models/blog.model")

const blogRouter=express.Router()

blogRouter.get("/api/blogs",async(req,res)=>{
    try{
        const {page,title,date,category,sort,order}=req.query
        let search={}
        
        if(title){
            search.title={$regex:title,$options:"i"}
        }
        if(category){
            search.category=category
        }
        sort={}
        if(order=="asc"){
          sort.date=1
        }else if(order=="desc"){
            sort.date=-1
        }

        const blog=await BlogModel.find().sort(sort).skip((page-1)*5).limit(5)
         
         res.status(200).send(blog)
       }
       catch(error){
           res.status(400).send({"err":error.message})
       }
})

blogRouter.post("/api/blogs",async(req,res)=>{
try{
 const blog=new BlogModel(req.body)
  await blog.save()
  res.status(200).send("blog successfully")
}
catch(error){
    res.status(400).send({"err":error.message})
}
})

	

blogRouter.patch("/api/blogs/:id",async(req,res)=>{
    const {id}=req.params
    const blog=await BlogModel.findOne({_id:id})
    try{
        if(req.body.blogID==blog.blogID){
            await BlogModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send(`blog has been update by id:${id}`)
        }else{
            res.status(200).send(`not authorised`)
        }
    }
    catch(error){
        res.status(400).send({"err":error.message})
    }
})

blogRouter.delete("/api/blogs/:id",async(req,res)=>{
    const {id}=req.params
    const blog=await BlogModel.findOne({_id:id})
    try{
        if(req.body.blogID==blog.blogID){
            await BlogModel.findByIdAndDelete({_id:id},req.body)
            res.status(200).send(`blog has been update by id:${id}`)
        }else{
            res.status(200).send(`not authorised`)
        }
    }
    catch(error){
        res.status(400).send({"err":error.message})
    }
})



blogRouter.patch("/api/blogs/:id/like",async(req,res)=>{
    const {id}=req.params
    const blog=await BlogModel.findOne({_id:id})
    try{
        if(req.body.blogID==blog.blogID){
            await BlogModel.findByIdAndUpdate({_id:id},blog.like)
            res.status(200).send(`blog has been update by id:${id}`)
        }else{
            res.status(200).send(`not authorised`)
        }
    }
    catch(error){
        res.status(400).send({"err":error.message})
    }
})

blogRouter.patch("/api/blogs/:id/comment",async(req,res)=>{
    const {id}=req.params
    const blog=await BlogModel.findOne({_id:id})
    try{
        if(req.body.blogID==blog.blogID){
            await BlogModel.findByIdAndUpdate({_id:id},blog.comment)
            res.status(200).send(`blog has been update by id:${id}`)
        }else{
            res.status(200).send(`not authorised`)
        }
    }
    catch(error){
        res.status(400).send({"err":error.message})
    }
})


module.exports={blogRouter}