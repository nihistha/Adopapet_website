const express = require('express');
const donationcontroller = require('../controllers/donation_controller.js');
const { authGuard } = require('../middleware/authGuard.js');

const router = express.Router();

router.post('/checkout', authGuard, donationcontroller.checkout);
router.get('/verify-esewa', authGuard, donationcontroller.verifyEsewa);

module.exports = router;
