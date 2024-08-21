
const meetModal = require("../models/meet_modal")

const createMeet = async(req,res)=>{
    const {pet,scheduledDate,pickupTime}= req.body;
    console.log(req.body)
    if(!scheduledDate|| !pickupTime){
        return res.json({
            'success': false,
            'message': 'Please enter all feilds'
        })
    }
    try {
        const meet = new meetModal({
            pet,
            scheduledDate,
            pickupTime,
            user : req.user.id
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

const getAllMeetSchedule = async (req, res) => {
    try {
      const meets = await meetModal.find()
        .populate({
          path: 'pet',
          select: 'petName petImage' // Select only the fields you need
        })
        .lean();
  
      const formattedMeets = meets.map(meet => ({
        _id: meet._id.toString(),
        scheduledDate: meet.scheduledDate.toISOString(),
        pickupTime: meet.pickupTime,
        pet: {
          id: meet.pet._id.toString(),
          petName: meet.pet.petName,
          petImage:meet.pet.petImage
        }
      }));
  
      res.json({
        success: true,
        data: formattedMeets
      });
    } catch (error) {
      console.error('Error in getAllMeet:', error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  }

module.exports ={
    createMeet,
    getAllMeetSchedule
}