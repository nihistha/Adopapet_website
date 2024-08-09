const router = require('express').Router()
const applicationcontroller = require('../controllers/application_controller')
const usercontroller = require("../controllers/user_controller");
const { authGuard } = require('../middleware/authGuard');

router.post('/create',usercontroller.createUser)
router.post("/login",usercontroller.loginUser)
router.post('/application/:id',applicationcontroller.userApplication)
router.get('/get_all_applications',applicationcontroller.getAllApplications)
router.get('/get_single_application/:id',applicationcontroller.getOneApplication)
router.put('/update-application/:id',applicationcontroller.updateApplication)
router.get('/profile/:id',applicationcontroller.getApplicationsByUserId)

module.exports = router;