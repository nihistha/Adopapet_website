const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    amount: {
        type: Number,
    }
});

const donation = mongoose.model("donation",donationSchema);
module.exports = donation  