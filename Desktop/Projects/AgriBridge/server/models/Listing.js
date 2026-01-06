const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            minLength: 30,
            required: true
        },
        quantity: {
            type: String,
            enum: ["g", "Kg", "quintal", "ton", "dozen"],
            default: "Kg",
            required: true
        },
        category: {
            type: String,
            enum: ["Vegetables", "Fruits", "Grains", "Spices"],
            required: true,
        },
        pricePerUnit: {
            type: Number,
            required: true, // e.g., 20 (Rupees)
        },
        quantityAvailable: {
            type: Number,
            required: true, // Stock management ke liye
        },
        minOrderQuantity: {
            type: Number,
            default: 10, // B2B logic: Hotel 1kg nahi mangayega, kam se kam 10kg
        },
        // 🔥 Quality Control Fields
        grade: {
            type: String,
            enum: ["A", "B", "C", "Mix"], // A = Export Quality, C = Soup Quality
            default: "Mix",
        },
        harvestDate: {
            type: Date, // Ye calculate karega ki maal kitna fresh hai
            required: true,
        },
        images: [
            {
                public_id: String, // Cloudinary ID
                url: String,       // Image URL
            },
        ],
        isActive: {
            type: Boolean,
            default: true, // Agar stock khatam ya farmer ne pause kiya
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);