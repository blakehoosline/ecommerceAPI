const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema(
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
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" }, //make received or something for when person gets order
    },
    { timestamps: true }
);


module.exports = mongoose.model("Order", OrderSchema);