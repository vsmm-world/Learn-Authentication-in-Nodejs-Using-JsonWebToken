const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const user= require('./models/user');
const ConnectDB = require('./connection/db')
const cookieParser= require('cookie-parser')
const {usreAuth} = require('./Auth/Auth')
const {AdminAuth}=require('./Auth/Admin')

ConnectDB();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use("/api/auth",require('./Auth/Route'))
app.use(cookieParser());

app.set("view engine", "ejs")

app.listen(port,()=>{

    console.log("Website is Running on : " + `http://localhost:${port}`);

})


app.get('/register',(req,res)=>{

    res.render("register")
});
app.get('/login',(req,res)=>{

    res.render("login")
});
app.get('/rv',usreAuth,(req,res)=>{
    res.render("rv")
})
app.get('/admin',AdminAuth,(req,res)=>{
    res.render('admin')
})
app.get('/admnlogin',(req,res)=>{
    res.render('adminSingIn')
})
app.get('/admnregister',(req,res)=>{
    res.render('adminSingUp')
})

