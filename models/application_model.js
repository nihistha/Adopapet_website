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
    occupation:{
        type: String,
        required: true,
    },
    haveDog: {
        type : Boolean,
        required : true,
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pet',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    
})