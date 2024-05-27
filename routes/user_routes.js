const router = require('express').Router()

const usercontroller = require("../controllers/user_controller");

router.post('/create',usercontroller.createUser)

module.exports = router;