const router = require('express').Router()
const applicationcontroller = require('../controllers/application_controller')
const usercontroller = require("../controllers/user_controller");
const { authGuard } = require('../middleware/authGuard');

router.post('/create',usercontroller.createUser)
router.post("/login",usercontroller.loginUser)
router.post('/application',authGuard,applicationcontroller.userApplication)

module.exports = router;