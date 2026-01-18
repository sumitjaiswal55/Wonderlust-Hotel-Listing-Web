const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn, isOwner, validateListing} = require("../middlewares.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage })

const listingController = require("../controllers/listings.js");

// Listing Route

router
.route("/")
.get((listingController.index) )
.post(isLoggedIn,
    upload.single('listing[image]'),
    wrapAsync(listingController.createRoute));



// New Route 

router.get("/new", isLoggedIn, (listingController.renderNewFrom));

// Edit Route

router.get("/:id/edit", isLoggedIn, isLoggedIn, isOwner, wrapAsync(listingController.editRoute));

// Update route

router
.route("/:id")
.put(isLoggedIn, isOwner, upload.single('listing[image]'), (listingController.updateRoute))
.delete(isLoggedIn, isOwner, (listingController.deleteRoute))
.get((listingController.showRoute));

module.exports = router;