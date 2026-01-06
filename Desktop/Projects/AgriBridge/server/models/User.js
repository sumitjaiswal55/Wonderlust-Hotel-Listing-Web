const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,

        },
        role: {
            type: String,
            enum: ["farmer", "buyer", "seller"],
            default: "buyer"
        },
        phone: {
            type: Number,
            required: true,
            maxLength: 10,
            minLength: 10
        },
        location: {
            type: {
                type: String,
                enum: ["Point"], // GeoJSON type must be 'Point'
                default: "Point",
            },
            coordinates: {
                type: [Number], // [longitude, latitude] - Order matters!
                required: true,
            },
            address: {
                type: String, // Human readable address for UI
            },
        },
        // Farmer specific details
        farmDetails: {
            size: Number, // in acres (optional, analytics ke liye)
            crops: [String], // ["Tomato", "Potato"] - Tags for search
        },
        // Buyer specific details
        businessName: {
            type: String, // e.g., "Taj Hotel"
        },
    },
    {
        timestamps: true
    }
);

UserSchema.index({location: "2dsphere"});

module.exports = mongoose.model("User" , UserSchema);