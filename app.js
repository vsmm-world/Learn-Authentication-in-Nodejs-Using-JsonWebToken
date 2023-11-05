const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const user= require('./models/user');
const ConnectDB = require('./connection/db')
const cookieParser= require('cookie-parser')
const {usreAuth} = require('./Auth/Auth')

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
