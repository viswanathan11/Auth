const mongoose = require('mongoose');
// this load the env file int the folder only not from the root
require("dotenv").config({path:"../.env"});
const MONGO_CONN=process.env.MONGO_CONN;

mongoose.connect(MONGO_CONN).then(()=>{
    console.log('Data base is connected')
}).catch((e)=>{
    console.log("error occured : "+e);
})