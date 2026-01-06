const Listing = require("../models/Listing.js");

exports.createListing = async (req, res) => {
    try {
        const {
            seller,
            name,
            description,
            quantity,
            category,
            pricePerUnit,
            quantityAvailable,
            grade,
            harvestDate
        } = req.body;

        const listing = await Listing.create({
            seller,
            name,
            description,
            quantity,
            category,
            pricePerUnit,
            quantityAvailable,
            grade,
            harvestDate,
            images: [{ url: "https://placehold.co/600x400/png", public_id: "dummy" }],
        });

        res.status(201).json({
            success: true,
            message: "Listing Created Successfully",
            data: listing
        })

    } catch (err) {
        console.error("Listing Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
}

exports.updateListing = async (req, res) => {
    try {
        let listing = await listing.findById(req.params.id);

        if (!listing) {
            return res.status(400).json({ status: false, message: "Product not found" })
        }

        if (listing.seller.toString() !== req.user.id) {
            return res.status(400).json({ status: false, message: "Not authroised to update this listing" })
        }

        listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return updated object
            runValidators: true,
        });
        res.status(200).json({ status: false, message: "Product list updated" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteListing = async (req, res) => {
    try {
        let listing = await listing.findById(req.params.id);

        if (!listing) {
            return res.status(400).json({ status: false, message: "Product not found" })
        }

        if (listing.seller.toString() !== req.user.id) {
            return res.status(400).json({ status: false, message: "Not authroised to update this listing" })
        }

        await listing.deleteOne();
        res.status(200).json({ status: false, message: "Product Delete" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};