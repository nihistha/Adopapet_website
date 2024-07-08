const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
    name :{
        type :String ,
        required : true,
    },
    address: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type : String,
        required : true
    },
    
})