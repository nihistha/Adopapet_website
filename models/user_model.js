const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    fullname :{
        type: String,
        required : true
    },
    phonenumber : {
        type : Number,
        required: true,
        match: [/^\+?[0-9\s-]{7,15}$/, 'Please enter a valid phone number']
    },
    email: {
        type : String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password : {
        type : String,
        required: true,
        minlength: 8
    }
})

const User = mongoose.model("user",user_schema);
module.exports = User;