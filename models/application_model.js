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
    phonenumber: {
        type : String,
        required : true
    },
    occupation:{
        type: String,
        required: true,
    },
    haveDog: {
        type : Boolean,
        default: false,
        required : true,
    },
    livingSituation:{
        type: String,
        required: true,
    },
    reasonsForAdopting: {
        type: String,
        required: true,
    },
    isApproved: {
        type: String,
    },
    adminMessage: {
        type: String,
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pet'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    
})

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;