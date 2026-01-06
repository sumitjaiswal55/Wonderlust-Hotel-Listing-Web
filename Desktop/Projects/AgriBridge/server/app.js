const express = require("express");
const app = express();
const mongoDB = require("./config/db.js");
const port = 3000
const userRoute = require("./routes/userRoutes.js");
const productRoute = require("./routes/productRoutes.js");
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, ()=>{
    console.log("Server is working")
});

app.get("/", (req, res)=>{
    res.send(`Server is running on port ${port}`);
});

app.use("/auth", userRoute);
app.use("/api", productRoute);
mongoDB();
