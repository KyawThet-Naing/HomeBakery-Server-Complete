const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;