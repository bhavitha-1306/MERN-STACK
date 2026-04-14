//mongose is used to connect node.js to mongodb
const mongoose = require("mongoose");
//create a schema(structure of data)
//schema defines what feilds will be stored in mongodb
const passwordSchema=new mongoose.Schema({
    password:String,
    length:Number,
    hasuppercase:Boolean,
    hasnumbers:Boolean,
    haspecial:Boolean,
    //store date and time automatically
    createdAt:{
        type:Date,
        default:Date.now
    }
});
//create a model for schema
//model is used to interact with mongodb collection
module.exports=mongoose.model("password",passwordSchema);