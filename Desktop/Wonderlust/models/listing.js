const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js")
const listingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    image: {
      filename: String,
      url: {
        type:String
      }
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review"
      }
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  });

  listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
       await Review.deleteMany({_id: {$in: listing.reviews}});
    }
    else{

    }
  })

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;