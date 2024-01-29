const { sign } = require("crypto");
const exprees = require("express");
const jwt =require("jsonwebtoken");
const jwtsecret = "op"
const mongoose = require("mongoose")
const app =exprees()
app.use(exprees.json())

const { escape } = require("querystring");
const secret = "hello"
mongoose.connect("mongodb+srv://sarkarjii534:%40sarkarop09@cluster0.kazdxwe.mongodb.net/practice")
const adminSchema = mongoose.Schema({
    username:String,
    password:String
})
const coureseSchema = mongoose.Schema({
     title:String,
     description:String,
     imageLink:String,  
    price:Number 
})
const course =mongoose.model("Course",coureseSchema)
const admin = mongoose.model("Admin",adminSchema)
app.post("/singup",async (req,res,async)=>{
const username= req.body.username
 const password=req.body.password
await admin.create({
   username: username,
    password:password
})
res.json(
    {
       message: "user created successfully"
    }
)

})

app.post("/sigin",async(req,res)=>{
    const username= req.body.username
    const password=req.body.password
    const user = await admin.find({
        username:username
    });
if(user){
    
   const token = jwt.sign({username},secret) 
   res.json({
    token:token
   })}else{
    res.status(404).json({
        msg:"user not found"
    })
   }

})
app.post("/courese",async(req,res)=>{
const auth =req.headers.authorization
const decode = jwt.verify(auth,secret)
if(decode.username){
const title = req.body.title;
const description = req.body.description;
const imageLink = req.body.imageLink;
const price = req.body.price;
// zod
const newCourse = await course.create({
    title,
    description,
    imageLink,
    price
})

res.json({
    message: 'Course created successfully', courseId: newCourse._id
})}else{
    res.status(404).json({
        msg:'Admin not found'
    })
}



})

app.listen(3000,()=>{
    console.log("your port is on 3000")
})

