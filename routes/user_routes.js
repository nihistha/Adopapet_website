const router = require('express').Router()
const applicationcontroller = require('../controllers/application_controller')
const usercontroller = require("../controllers/user_controller");

router.post('/create',usercontroller.createUser)
router.post("/login",usercontroller.loginUser)
router.post('/application',applicationcontroller.userApplication)

module.exports = router;