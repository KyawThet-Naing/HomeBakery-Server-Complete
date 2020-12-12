const mongoose = require("mongoose");
const { Schema } = mongoose;
const adsSchema = new Schema({
    slideText: { type: String, required: true },
    images: { type:Array, required: true }
});

const Ads = mongoose.model("ads", adsSchema);

module.exports = Ads;