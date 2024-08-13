const router = require('express').Router()
const applicationcontroller = require('../controllers/application_controller')
const usercontroller = require("../controllers/user_controller");
const { authGuard } = require('../middleware/authGuard');

router.post('/create',usercontroller.createUser)
router.post("/login",usercontroller.loginUser)
router.get('/getuser',authGuard,usercontroller.getUser)
router.post('/application',authGuard,applicationcontroller.userApplication)
router.get('/get_all_applications',applicationcontroller.getAllApplications)
router.get('/get_single_application/:id',applicationcontroller.getOneApplication)
router.put('/update-application/:id',applicationcontroller.updateApplication)
router.get('/profile',authGuard,applicationcontroller.getApplicationsByUserId)
router.delete('/delete_application/:id',applicationcontroller.deleteApplication)

module.exports = router;