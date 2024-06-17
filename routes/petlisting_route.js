const router = require('express').Router()

const listingscontroller = require("../controllers/add_listing_controller")

router.post('/create',listingscontroller.createListing)
router.get('/getlisting',listingscontroller.getListing)
router.get('/get_all_listings',listingscontroller.getAllListing)
module.exports = router;