const mongoose = require("mongoose")


const CartSchema = new mongoose.Schema(
    {
        //properties
        userId:{ type: String, requried: true },
        products:[
            {
                productId:{
                    type: String
                },
                quantity:{
                    type: Number,
                    default: 1,
                },
            },
        ],
    },
    { timestamps: true }
);


module.exports = mongoose.model("Cart", CartSchema);