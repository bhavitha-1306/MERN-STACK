const express=require("express");
const mongoose=require("mongoose");
const path = require("path");
const password=require("./models/password")
const app=express();
//middleware
app.use(express.json());
//this gives the frontend
app.use(express.static("public"));
//connect mongodb
mongoose.connect("mongodb://localhost:27017/passworddb").then(()=>{
    console.log("Mongodb connected");
}).catch((err)=>{
    console.log(err);
});

//save password
app.post("/save-password",async(req,res)=>{
    try{
        const newpassword=new password(req.body);
        await newpassword.save();
        res.json({
            message:"password saved successfullly"
        });
    }catch(error){
        res.status(500).json({
            error:"error saving password"
        });
    }
});

app.get("/passwords",async(req,res)=>{
    const data = await password.find();
    res.json(data);
});

//start server
app.listen(5000,()=>{
    console.log("server running on port 5000");
});