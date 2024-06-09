const mongoose = require("mongoose")

const addListingSchema = new mongoose.Schema({
    petName :{
        type: String,
        required: true
    },
    petType : {
        type : String,
        required: true
    },
    breed : {
        type : String,
        required: true
    },
    gender : {
        type : String,
        required: true
    },
    size: {
        type : String,
        required : true
    },
    aboutPet : {
        type : String,
        required : true
    },
    petImage : {
        type: String ,
        required : true
    }   
})

const pet_listing = mongoose.model("pet",addListingSchema);
module.exports = pet_listing