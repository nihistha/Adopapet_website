const userModel = require("../models/user_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async ({ body }, res) => {
    const { fullname,phonenumber, email, password } = body; // destructuring the data

    //validation
    if(!fullname || !phonenumber || !email || !password){
        return res.json({
            "sucess" : false,
            "message" : "Please enter all fields"
        })
    }
    try {
        const existingUser = await userModel.findOne({email: email})
        if(existingUser){
            return res.json({
                "sucess" : false,
                "message" : "User Already Exists"
            })
        }
        const randomsalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,randomsalt)

        const newUser = new userModel({
            fullname,
            phonenumber,
            email,
            password: hashPassword,
        });

        await newUser.save();
        res.json({
            success: true,
            message: "User Created Successfully"
        });
    } catch (error) {
        console.error("User creation error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}

module.exports = {
    createUser
}