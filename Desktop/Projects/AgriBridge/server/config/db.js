const mongoose = require("mongoose");
// const User = require("../models/User.js");
// const Listing = require("../models/Listing.js");

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/agribridge");
        console.log("DB connected successfully");
    }
    catch(err){
        console.error('MongoDB connection error:', err);
    }
};


module.exports = connectDB;