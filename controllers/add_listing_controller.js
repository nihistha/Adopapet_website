const petListingModel = require("../models/add_listing_model.js")
const path = require('path')

const createListing = async(req,res) => {
    const {petName, petType, breed, gender, size, aboutPet} = req.body
        
        //validation
        if(!petName || !petType || !breed || !gender ||!size|| !aboutPet){
            return res.json({
                "sucess" : false,
                "message" : "Please enter all fields"
            })
        }
        //image check
        if(!req.files || !req.files.petImage){
            return res.status(400).json({
                success : false,
                message : "Image not found!"
            })
        }

        const {petImage} = req.files;
        //Uploading
        // Generate unique name for photos
        const imageName = `${Date.now()}-${petImage.name}`

        // definw specific path
        const imageUploadPath = path.join(__dirname,`../public/listings/${imageName}`)
        try {
            await petImage.mv(imageUploadPath)
            // res.send("Image uploaded")
            const pet = new petListingModel({
                petName: petName,

                petType : petType,
                breed: breed,
                gender: gender,
                size: size,
                aboutPet : aboutPet,
                petImage: imageName
            })

            const newPet = await pet.save()
            res.status(201).json({
                success:true,
                message:"New pet added",
                data: newPet
            })
        } catch (error) {
            console.log(error)
            res.json({
            success : false,
            message : "Internal server error",
            error: error
        })
        }

}
const getAllListing = async (req, res) => {
    //try catch

    //find all the products
    //send response
    try {
        const listings = await petListingModel.find({})
        res.status(201).json({
            "success": true,
            "message": "listings fetched successfully",
            "listings": listings
        })
    } catch (error) {
        console.log("error")
    }
}

module.exports = {
    createListing,getAllListing,
}