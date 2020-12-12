const mongoose = require("mongoose");
const { Schema } = mongoose;

const gallerySchema = new Schema({
    name: { type: String, required: true },
    filename: { type: String, required: true },
    folder: { type: String, required: true },
    path: { type: String, required: true }
});

const Gallery = mongoose.model("gallery", gallerySchema);

module.exports = Gallery;