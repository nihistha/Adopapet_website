const applicationModel = require('../models/application_model')

const userApplication = async(req,res)=>{
    const {name,age,occupation,address,email,phonenumber,haveDog,livingSituation,reasonsForAdopting,petId}= req.body;
    console.log(req.body)
    if(!name ||!age || !occupation || !address || !email || !phonenumber || haveDog === undefined  || !livingSituation || !reasonsForAdopting){
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
            userId : req.user.id
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

const getOneApplication = async(req,res)=>{
    const applicationId = req.params.id;
    try {
        const application = await applicationModel.findById(applicationId)
        res.status(201).json(
            application
        )


    } catch (error) {
        console.log(error)
        res.json({
            'success': false,
            'message': "Server Error"
        })
    }
}

// Update application
const updateApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const updates = req.body;

        const updatedApplication = await applicationModel.findByIdAndUpdate(applicationId, updates, { new: true });
        
        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteApplication = async (req, res) => {

    const id = req.params.id;

    try {
        await applicationModel.findByIdAndDelete(id)
        res.status(201).json({
            'success': true,
            'message': "Application deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'success': false,
            'message': "Internal Server Error"
        })
    }
}

const getApplicationsByUserId = async (req, res) => {
    try {
        // Find all applications where the userId matches
        const applications = await applicationModel.find({userId: req.user.id});

        if (applications.length === 0) {
            return res.status(404).json({
                "success": false,
                "message": "No applications found for this user"
            });
        }

        res.status(200).json({
            "success": true,
            "message": "Applications fetched successfully",
            "applications": applications
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({
            "success": false,
            "message": "Error fetching applications",
            "error": error.message
        });
    }
};

module.exports={userApplication,getAllApplications,getOneApplication,updateApplication,getApplicationsByUserId,deleteApplication}