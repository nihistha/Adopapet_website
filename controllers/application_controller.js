const applicationModel = require('../models/application_model')

const userApplication = async(req,res)=>{
    const {name,age,occupation,address,email,phonenumber,haveDog,livingSituation,reasonsForAdopting}= req.body
    if(!name ||!age || !occupation || !address || !email || !phonenumber || !haveDog || !livingSituation || !reasonsForAdopting){
        return res.json({
            'success': false,
            'message': 'Please enter all feilds'
        })
    }

    try {
        const user_application= new applicationModel({
            name:name,
            age: age,
            occupation:occupation,
            address: address,
            email: email,
            phonenumber: phonenumber,
            haveDog: haveDog,
            livingSituation: livingSituation,
            reasonsForAdopting: reasonsForAdopting
        })
        console.log(user_application)
        const application = await user_application.save()
        res.status(201).json({
            'success':true,
            'message':"Application sent",
            'data': application
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

module.exports={userApplication}