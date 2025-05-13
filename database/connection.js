const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pwdManager")
    .then((data)=>{
        console.log("Database connected!");
    })
    .catch((e)=>{
        console.log("Database connection Failed!!");
        
    })



const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    cpassword : String,
    
    
})

const passwordSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    
})

const userModel = new mongoose.model('user',userSchema);
const passwordModel = new mongoose.model('password',passwordSchema);

module.exports = {userModel,passwordModel};