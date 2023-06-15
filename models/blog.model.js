const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    username:{type:String,required:true},
    avatar:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const BlogModel=mongoose.model("blog",blogSchema)
module.exports={BlogModel}