const express = require('express');
const router =  express.Router();
const {register, login}= require('./Auth');
const {AdminLogin,AdminRegister}=require('./Admin')
router.route("/login").post(login)
router.route("/register").post(register);
router.route("/admnlogin").post(AdminLogin);
router.route("/admnregister").post(AdminRegister);

module.exports= router;
