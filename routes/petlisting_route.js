const router = require('express').Router()

const listingscontroller = require("../controllers/add_listing_controller")

router.post('/create',listingscontroller.createListing)

module.exports(router)