const mongoose = require("mongoose")


const ProductSchema = new mongoose.Schema(
    {
        //properties
        title:{ type: String, required: true, unique: true },
        desc:{ type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array }, //can put multiple names
        size: { type: Array },
        color: { type: Array },
        price: { type: String, required: true },
        inStock: { type: Boolean, default: true },
        
    },
    { timestamps: true }
);


module.exports = mongoose.model("Product", ProductSchema);