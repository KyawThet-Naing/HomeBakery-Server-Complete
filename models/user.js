const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    //user role
    role: { type: String, required: true },
    //ban user
    banned: { type: Boolean, default: false }
});

const User = mongoose.model('user', userSchema);

module.exports = User;