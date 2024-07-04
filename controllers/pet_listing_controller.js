const petListingModel = require("../models/pet_listing_model.js")
const path = require('path')
const fs = require("fs")

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

const deleteListing = async (req, res) => {

    const id = req.params.id;

    try {
        await petListingModel.findByIdAndDelete(id)
        res.status(201).json({
            success: true,
            message: "Listing deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getOnlyListing = async(req,res) =>{
    try {
        const listings = await petListingModel.find({})
        res.status(201).json(
            listings
        )
    } catch (error) {
        console.log("error")
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
const getListing = async (req, res) => {

    //receive id from URL
    const listingId = req.params.id;
    try {
        const listing = await petListingModel.findById(listingId)
        res.status(201).json(
            listing
        )


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Server Error"
        })
    }
}

const updateListing = async (req, res) => {
    console.log(req.body)
    try {
        // if there are files, upload new and delete old
        if (req.files && req.files.petImage) {

            //upload new to /public/products
            const { petImage } = req.files;

            //make a new image name
            const imageName = `${Date.now()}-${petImage.name}`

            const imageUploadPath = path.join(__dirname, `../public/listings/${imageName}`)

            await petImage.mv(imageUploadPath)

            req.body.petImage = imageName;

            const existingListing = await petListingModel.findById(req.params.id)

            if (req.body.petImage) {
                const oldImagePath = path.join(__dirname, `../public/listings/${existingListing.petImage}`)
                fs.unlinkSync(oldImagePath)
            }
        }
        const updated = await petListingModel.findByIdAndUpdate(req.params.id, req.body)

        res.status(201).json({
            success: true,
            message: "Listing Updated",
            updatedListing: updated
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error

        })
    }
}
const pagination = async (req,res) => {
    const resultPerPage = 4;

    const pageNo = req.query.page;

    try {
        const listings = await petListingModel.find({})
        .skip((pageNo - 1) * resultPerPage)
        .limit(resultPerPage)

        if(listings.length === 0){
            return res.status(400).json({
                "success" : false,
                "message" : "No listings Found"
            })
        }

        res.status(200).json({
            "success" : true,
            "message" : "listings fetched",
            "listings": listings
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success" : false,
            "message" : "Internal Server error"
        })
    }
}

const searchProduct = async(req,res)=>{
    const searchQuery = req.query.q || '';
    const searchBreed = req.query.breed||'';

    try {
        const filter = {};

        if(searchQuery){
            filter.petType = {$regex: searchQuery,$options:'i'};

        }
        if(searchBreed){
            filter.breed = {$regex:searchBreed,$options:'i'};
        }
        const listings = await petListingModel.find(filter);

        res.status(201).json({
            'success': true,
            'message':'Listing fetched',
            'listings':listings
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            'success': false,
            'message': 'Server Error'
        })
    }
}

module.exports = {
    createListing,getAllListing,getListing,updateListing,deleteListing,getOnlyListing,pagination,searchProduct
}