const userModel = require("../models/user_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');

const createUser = async (req, res) => {
    console.log(res.data)
    const { fullname,phonenumber, email, password ,isAdmin} = req.body; // destructuring the data

    //validation
    if(!fullname || !phonenumber || !email || !password){
        return res.status(400).json({
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

const getUser = async (req, res) => {
    const user = await userModel.findById(req.user.id).select("-password -__v ");
    return res.status(200).json({
         success: true,
          data: user });
  }

const updateUser = async(req,res)=>{
    try {
        updates = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(req.user.id, updates, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP and expiry
        user.otpReset = otp;
        user.otpResetExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Send email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'suyogmanandhar2022@gmail.com',
                pass: 'esuc ialc qrof xenr'
            }
        });

        var mailOptions = {
            from: 'suyogmanandhar2022@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: 'Password reset OTP sent' });
            }
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' }); // Handle server errors
    }
};

// Verify OTP and Set New Password
const verifyOtpAndPassword = async (req, res) => {
    const { email, otp, password } = req.body;
    console.log(otp)

    if (!email || !otp || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const now = Date.now();
        const otpResetExpires = user.otpResetExpires.getTime();

        console.log(`Current Time (ms): ${now}`);
        console.log(`OTP Expiry Time (ms): ${otpResetExpires}`);
        console.log(`Stored OTP: ${user.otpReset}`);
        console.log(`Provided OTP: ${otp}`);

        if (user.otpReset != otp) {
            console.log('Provided OTP does not match stored OTP');
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (otpResetExpires < now) {
            console.log('OTP has expired');
            return res.status(400).json({ message: 'Expired OTP' });
        }

        const randomSalt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, randomSalt);
        user.otpReset = undefined;
        user.otpResetExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createUser,
    loginUser,
    getUser,
    updateUser,
    forgotPassword,
    verifyOtpAndPassword
}