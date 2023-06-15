const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    username:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,required:true},
    date:{type:Date,required:true},
    likes:{type:Number,required:true},
    comments: [{ username: String, content: String }],
    blogger:{type:String,required:true},
    blogID:{type:String,required:true},
})

const BlogModel=mongoose.model("blog",blogSchema)
module.exports={BlogModel}