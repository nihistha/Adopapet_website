const petListingModel = require("../models/add_listing_model.js")

const createListing = async(req,res) => {
    const {petName, petType, breed, gender, size, aboutPet,petImage} = req.body
        
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

        const {productImage} = req.files;
        //Uploading
        // Generate unique name for photos
        const imageName = `${Date.now()}-${productImage.name}`

        // definw specific path
        const imageUploadPath = path.join(__dirname,`../public/listings/${imageName}`)
        try {
            await petImage.mv(imageUploadPath)
            // res.send("Image uploaded")
            const pet = new petListingModel({
                petName: petName,
                petImage : petType,
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

module.exports = {
    createListing,
}