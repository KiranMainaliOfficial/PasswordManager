const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { userModel, passwordModel } = require("./database/connection");
const { urlencoded } = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// paths
publicPath = path.join(__dirname, "public");


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.set("view engine", "ejs");


// landing page
app.get('/', (req, res) => {
    title = "Smart Password Management";
    res.render("index.ejs", { title });
})

// login page
app.get('/login', (req, res) => {
    title = "login/Register"
    hasErr = false;
    res.render("form", { title ,hasErr});
})
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const userEmail = await userModel.countDocuments({ email });
    if (userEmail > 0) {
        hasErr = true;
        messages = "Email Exists!";
        res.render("form",{hasErr,messages});
    } else {
        bcrypt.hash(password, 10, function (err, hash) {
            console.log(hash);
            
            userModel.create({
                name,
                email,
                password:hash
            }).then((data) => {
                console.log("document created successfully");
            }).catch((e) => {
                console.log("document not created");
            })
            res.redirect("/login");
        })

    }

})

// login
app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const userEmail = await userModel.findOne({email});
        console.log(userEmail);

        bcrypt.compare(password,userEmail.password,function(err,result){
            if(result){
                res.redirect("/dashboard");
            }else{
            // res.redirect("/login");
            hasErr = true;
            messages = "Invalid Credentials!";
            res.render("form",{hasErr,messages});
        }

        })
        
    }catch(e){
        // res.redirect("/login")
        hasErr = true;
        messages = "Invalid Credentials!";
        res.render("form",{hasErr,messages});

    }
})


// dashboard
app.get('/dashboard',(req,res)=>{
    title = "dashboard"
    res.render("dashboard",{title});
})


// send 404 pages
app.use((req, res) => {
  res.status(404).render('error');
});
// listening the port
app.listen(2000, (req, res) => {
    console.log("listening to the port 2000");
})