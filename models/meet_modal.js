const mongoose = require("mongoose")

const scheduleMeetSchema = new mongoose.Schema({
    pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true

  },
  petName:{
    type:String
  },
  scheduledDate: {

    type: Date,
    required: true
  },
  pickupTime: {
    type: String,  // Time in HH:MM format
    required: true
  },
});

const meet = mongoose.model("meet",scheduleMeetSchema);
module.exports = meet  