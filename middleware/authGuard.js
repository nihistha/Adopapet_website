const jwt = require('jsonwebtoken')

const authGuard  = (req,res,next) =>{
    // 1. get auth headers (content type, authorization)
    console.log(req.headers)

    //get authorization
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(400).json({
            'success': false,
            "message": 'Authorization header not found'
        })
    }
    
    
    //if not found stop the process(res)
    // authorization format : "Bearer tokenajknjfknv" so split the token by space and take only the token

    const token = authHeader.split(' ')[1]
    //if token not found send response
    if(!token || token === ""){
        return res.status(400).json({
            "success" : false,
            "message" : "Token is missing"
        })
    }
    try {
        //verify the token and get user information
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedUser;
        next()
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            "success": false,
            "message": "Not Authenticated"
        })
    }
}

//admin guard
const adminGuard  = (req,res,next) =>{
    // 1. get auth headers (content type, authorization)
    console.log(req.headers)

    //get authorization
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(400).json({
            "success": false,
            "message": 'Authorization header not found'
        })
    }
    
    
    //if not found stop the process(res)
    // authorization format : "Bearer tokenajknjfknv" so split the token by space and take only the token

    const token = authHeader.split(' ')[1]
    //if token not found send response
    if(!token || token === ""){
        return res.status(400).json({
            "success" : false,
            "message" : "Token is missing"
        })
    }
    try {
        //verify the token and get user information
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedUser;
        // check if user is admin or not
        if(!req.user.isAdmin){
            return res.status(400).json({
                "success" : false,
                "message": "Permission Denied!"
            })
        }
        next()
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            "success": false,
            "message": "Not Authenticated"
        })
    }
}
module.exports = {
    authGuard,
    adminGuard
}