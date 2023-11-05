const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = '2b4ec6aa2fc68c1b8b1ae4769e38666ba8a7ac97d306e83ca371925d9933947fad8bcc'


exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;


    if (password.lenght < 6) {

        return res.status(400).json({ message: "Password is less then 6 characters" });

    }

    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            name,
            email,
            password: hash,
        }).then((usr) => {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
                { id: usr._id, email },
                jwtSecret,
                {
                    expiresIn: maxAge,
                }
            );
            res.cookie("jwt", token, {
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

exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email or Passowrd not Enterd by User"
        })
    }
    const usr = await User.findOne({ email });

    try {
        if (!usr) {
            res.status(401).json({
                message: "Not Logged in",
                error: "Usre Not Found"
            })
        } else {
            bcrypt.compare(password, usr.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                        { id: usr._id, email },
                        jwtSecret,
                        {
                            expiresIn: maxAge,
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000,
                    })
                    res.status(201).json({
                        message: "Login successful",
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

exports.usreAuth =(req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token ,jwtSecret,(err,decodedToken)=>{
            if(err){
                return res.redirect('login')

            }else{
                next();
            }
        })
    }
    else{
        return res.status(401).redirect('/login')
    }
}