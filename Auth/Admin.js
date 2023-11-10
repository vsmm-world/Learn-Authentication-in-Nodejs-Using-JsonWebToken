const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const admin = require('../models/admin');
const adminSecret ='b43e899c2fbe799736a25625900faf5e475d4f96b2e33106a14f0e84425c55f0856e62';



exports.AdminRegister = async (req, res, next) => {
    const { name, email, password } = req.body;


    if (password.lenght < 6) {

        return res.status(400).json({ message: "Password is less then 6 characters" });

    }

    bcrypt.hash(password, 10).then(async (hash) => {
        await admin.create({
            name,
            email,
            password: hash,
        }).then((usr) => {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
                { id: usr._id, email },
                adminSecret,
                {
                    expiresIn: maxAge,
                }
            );
            res.cookie("admn", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
            });
            res.status(201).json({
                message: "User Successfully Registred !!",
                usr: usr._id,
            })
        }).catch((err) => {
            res.status(401).json({
                message: "User Not Registerd !! ",
                error: err.mesage,
            })
        })
    })
}


exports.AdminLogin = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email or Passowrd not Enterd by User"
        })
    }
    const usr = await admin.findOne({ email });

    try {
        if (!usr) {
            res.status(401).json({
                message: "Not Logged in",
                error: "User Not Found"
            })
        } else {
            bcrypt.compare(password, usr.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                        { id: usr._id, email },
                        adminSecret,
                        {
                            expiresIn: maxAge,
                        }
                    );
                    res.cookie("admn", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000,
                    })
                    res.status(201).json({
                        message: "Admin Login successful",
                        usr: usr._id,
                    })
                } else {
                    res.status(400).json({ message: "Login not succesful" })
                }
            })
        }
    } catch (err) {
        res.status(400).json({
            message: "An error accourd",
            error: err.message,
        })
    }
}

exports.AdminAuth =(req,res,next)=>{
    const token = req.cookies.admn;

    if(token){
        jwt.verify(token ,adminSecret,(err,decodedToken)=>{
            if(err){
                return res.redirect('/admnlogin')

            }else{
                next();
            }
        })
    }
    else{
        return res.status(401).redirect('/admnlogin')
    }
}
