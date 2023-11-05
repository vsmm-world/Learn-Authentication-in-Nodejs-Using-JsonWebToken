const mongoose = require('mongoose')

const localdb= 'mongodb://127.0.0.1:27017/trial'

const ConnectDB = async ()=>{
    await mongoose.connect(localdb).then(()=>{
        console.log("Connected");
    })
}

module.exports= ConnectDB;