import mongoose from "mongoose";
import dotenv from "dotenv";
//config loads the file
dotenv.config();
// this load the env file int the folder only not from the root
// dotenv.config({path:"../.env"});
const MONGO_CONN=process.env.MONGO_CONN;

mongoose.connect(MONGO_CONN).then(()=>{
    console.log('Data base is connected')
}).catch((e)=>{
    console.log("error occured : "+e);
})