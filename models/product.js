const mongoose = require("mongoose")
const { Schema } = mongoose;
const productSchema = new Schema({
    name: { type: String, required: true },
    images: { type: Array, required: true },
    desc: { type: String, required: true },
    priceAndSize: { type: Array, required: true },
    taste: { type: Array, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true },
    //default
    status: { type: Boolean, default: true },
    servicePhone: { type: Array, required: true },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;


