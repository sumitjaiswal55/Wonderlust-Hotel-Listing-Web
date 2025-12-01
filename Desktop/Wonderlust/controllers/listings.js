const Listing =  require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});


// Listing Route

module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}


// New Route
module.exports.renderNewFrom = (req, res)=>{

    res.render("listings/new.ejs");
}

// Create Route
module.exports.createRoute = async(req, res, next)=>{
    let coordinate = await geocodingClient
    .forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
      
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "..", filename);

    const newListings = new Listing(req.body.listing);
    newListings.owner = req.user._id;
    newListings.image = {url, filename};
    
    // Map 
    newListings.geometry = coordinate.body.features[0].geometry

    let savedListing = await newListings.save();
    console.log(savedListing);
    req.flash("success", "New listings added ");
    res.redirect("/listings");
}

// Edit Route
module.exports.editRoute = async (req, res)=>{
    
    let {id} = req.params;
    const listing = await Listing.findById(id);

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("upload", "/upload/h_250,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}


// Update Route
module.exports.updateRoute = async( req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    await listing.save();
  
    if (typeof req.file !== "undefined") {
      let filename = req.file.filename;
      let url = req.file.path;
      
      console.log(listing);
      listing.image = {url, filename};
      await listing.save();
    }
  
    req.flash("success", "Listings Updated ");
    res.redirect(`/listings/${id}`)
  }

// Delete Route
module.exports.deleteRoute = async(req, res) => {
    let { id } = req.params;
    
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listings Deleted ");
    res.redirect("/listings");
}


// Show Route
module.exports.showRoute = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({
      path:"reviews",
      populate:{
        path:"author"
      }
    })
    .populate("owner");
    if(!listing){
      req.flash("error","Sorry! your requested listing doesnot exist...");
      res.redirect("/listings");
    }
    
    let response = await geocodingClient.forwardGeocode({
      query: listing.location,
      limit: 1
    })
    .send();
    listing.geometry = response.body.features[0].geometry;
    res.render("listings/show.ejs", {listing});
}