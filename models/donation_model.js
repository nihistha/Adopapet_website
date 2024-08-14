const mongoose = require("mongoose")

const donationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    amount: {
        type: Number,
    }
});