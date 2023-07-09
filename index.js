const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => { 
        console.log(err)
    });

app.use(cors());

app.use(express.json());//to take in json
app.use("/api/auth", authRoute); //auth route
app.use("/api/users", userRoute); //user route
app.use("/api/products", productRoute); //product route
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute); 


app.get("/test", () => {
    console.log("test success");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running");
});