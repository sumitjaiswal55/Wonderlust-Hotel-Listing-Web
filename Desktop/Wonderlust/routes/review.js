const express= require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js");
const Reviews = require("../models/reviews.js");
// const { validateReview } = require("../middlewares.js")
const {reviewSchema} = require("../schema.js");
const { isLoggedIn, isReviewAuthor } = require("../middlewares.js");

const reviewController = require("../controllers/reviews.js");


const validateReview = ((req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressError(400, errMsg)); // Use `next` instead of `throw`
    }
    next();
});



// Reviews 

router.post("/", isLoggedIn, (reviewController.reviewCreate));

// Delete Review

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, (reviewController.reviewDelete));


module.exports = router;