const express = require("express");
const app = express();


app.get('/',(req,res)=>{
    res.send("hello");
})

app.listen(2000,(req,res)=>{
    console.log("listening to the port 2000");
})