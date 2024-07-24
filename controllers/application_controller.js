const applicationModel = require('../models/application_model')

const userApplication = async(req,res)=>{
    const {name,age,occupation,address,email,phonenumber,haveDog,livingSituation,reasonsForAdopting,petId,userId}= req.body;
    if(!name ||!age || !occupation || !address || !email || !phonenumber || !haveDog || !livingSituation || !reasonsForAdopting){
        return res.json({
            'success': false,
            'message': 'Please enter all feilds'
        })
    }
    try {
        const user_application = new applicationModel({
            name,
            age,
            occupation,
            address,
            email,
            phonenumber,
            haveDog,
            livingSituation,
            reasonsForAdopting,
            petId,
            userId
        });

        console.log(user_application);

        const application = await user_application.save();
        res.status(201).json({
            'success':true,
            'message':"Application sent",
            data: application
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

const getAllApplications = async(req,res)=>{
    try {
        const applications = await applicationModel.find({})
        res.status(201).json({
            "success": true,
            "message": "Applications fetched successfully",
            "applications": applications
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports={userApplication,getAllApplications}