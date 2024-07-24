const userModel = require("../models/user_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    console.log(res.data)
    const { fullname,phonenumber, email, password ,isAdmin} = req.body; // destructuring the data

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
            isAdmin
        });

        await newUser.save();
        res.json({
            'success': true,
            'message': "User Created Successfully"
        });
    } catch (error) {
        console.error("User creation error:", error);
        res.status(500).json({
            'success': false,
            'message': "Internal Server Error"
        });
    }

}

const loginUser = async(req,res)=>{
    console.log(req.body)
    const{email,password} = req.body;
    if(!email|| !password){
        return res.status(400).json({
            "sucess" : false,
            "message" : "Please enter all fields"
        })
    }
    try {
        const user = await userModel.findOne({email : email})
        if(!user){
            return res.status(404).json({
                "success" : false,
                "message" : "User Not found"
            })
        }

        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.status(401).json({
                "success" : false,
                "message" : "Incorrect password"
            })
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET
        )
        
        res.status(200).json({
            "success" : true,
            "message" : "Login successful",
            "token" : token,
            "userData" : user,
            "isAdmin":user.isAdmin
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success" : false,
            "message" : "Internal server error"
        })
    }
}

module.exports = {
    createUser,
    loginUser
}