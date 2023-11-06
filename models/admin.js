const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        unique: true,
        required:true,
    },
    password:{
        type:String,
        minlenght:6,
        required:true,
    },
})

const admin = mongoose.model('admin',UserSchema);

module.exports = admin; 