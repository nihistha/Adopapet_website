
const meetModal = require("../models/meet_modal")

const createMeet = async(req,res)=>{
    const {petId,scheduledDate,pickupTime}= req.body;
    console.log(req.body)
    if(!scheduledDate|| !pickupTime){
        return res.json({
            'success': false,
            'message': 'Please enter all feilds'
        })
    }
    try {
        const meet = new meetModal({
            scheduledDate,
            pickupTime,
            userId : req.user.id
        });

        console.log(meet);

        const newmeet = await meet.save();
        res.status(201).json({
            'success':true,
            'message':"Meet Scheduled",
            data: newmeet
        })
    } catch (error) {
        console.log(error)
            res.json({
            'success' : false,
            'message' : "Internal server error",
            'error': error.message
        })
    }
}

module.exports{
    createMeet
}