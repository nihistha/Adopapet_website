const router = require('express').Router()

const usercontroller = require("../controllers/user_controller");

router.post('/create',usercontroller.createUser)
router.post("/login",usercontroller.loginUser)

module.exports = router;