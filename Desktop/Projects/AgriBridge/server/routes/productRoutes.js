const express = require("express");
const router = express.Router();
const {createListing, updateListing, deleteListing} =  require("../controller/listingController.js");
const protect = require("../middleware/authMiddleware.js")

router.post("/create", protect, createListing);
router.route("/:id", protect,)
  .put(updateListing)

router.route("/:id", protect,)
  .delete(deleteListing);

// getallListings
// getnearbyListings

module.exports = router;