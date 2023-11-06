const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlenght: 6,
        required: true,
    },
}, {
    timestamps: {
        createdAt:'created_at',
        updatedAt:'updated_at',
    }
})

const user = mongoose.model('user', UserSchema);

module.exports = user; 