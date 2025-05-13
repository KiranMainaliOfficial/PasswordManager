const express = require("express");
const app = express();
const path = require("path");

// paths
publicPath = path.join(__dirname,"public");
console.log(publicPath);


app.use(express.static(publicPath))

app.get('/',(req,res)=>{
    res.send("hello");
})

app.listen(2000,(req,res)=>{
    console.log("listening to the port 2000");
})