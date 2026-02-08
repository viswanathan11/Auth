// this is an user moduel which defiens the structure of user data
const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;