const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone, latitude, longitude, address } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ success: false, message: "Please provide all details" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const locationData = {
            type: "Point",
            coordinates: [longitude || 0, latitude || 0], // Note: MongoDB mein pehle Longitude aata hai!
            address: address || "Not provided"
        };

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role: role || "buyer",
            phone,
            location: locationData
        });

        if (user) {
            res.status(200).json({
                success: true,
                message: "User Registered Successfully",
                data: {
                    _id: user.id,
                    name: user.name,
                    password: user.password,
                    email: user.email,
                    role: user.role
                }
            })
        }
        else {
            res.status(400).json({ success: false, message: "Invalid user data" });
        }

    }
    catch (err) {
        console.error("Register Error", err);
        res.status(500).json({ success: false, message: err.message })
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });
        const hashPass = await bcrypt.compare(password, user.password);

        if (user && hashPass) {
            res.json({
                success: true,
                data: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user.id), 
                },
            });
        }
        else {
            res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}