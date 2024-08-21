const express = require('express');
const {checkout,verifyPayment} = require('../controllers/donation_controller.js');
const { authGuard } = require('../middleware/authGuard.js');

const router = express.Router();

router.post('/checkout', authGuard, checkout);
router.get('/verify-esewa', verifyPayment);

module.exports = router;