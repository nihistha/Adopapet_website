const router = require('express').Router()

const listingscontroller = require("../controllers/add_listing_controller")

router.post('/create',listingscontroller.createListing)
router.get('/getlisting/:id',listingscontroller.getListing)
router.get('/get_all_listings',listingscontroller.getAllListing)
router.delete('/delete_listing/:id',listingscontroller.deleteListing)
router.put('/updatelisting/:id',listingscontroller.updateListing)
module.exports = router;