const express=require("express")
const cors=require("cors")
const app=express()
const { userRouter } = require("./router/user.router")
const { connection } = require("./db")
const { auth } = require("./middleware/Auth")
const { blogRouter } = require("./router/blog.router")
require("dotenv").config()


app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("home page")
})
app.use(auth)
app.use("blogs",blogRouter)
app.use("/users",userRouter)
app.listen(process.env.port,async()=>{
    try{
           await connection
           console.log("connected to the db")
    }
    catch(error){
        console.log(error)
        console.log(" Not connected to the db")
    }
    console.log("server is running ate the port is 8080")
})