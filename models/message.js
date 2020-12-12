const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
    from: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    to: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    msg: { type: String, required: true },
    type: { type: String, required: true },
    toGetMsg: { type: String, required: true },
    created: { type: Date, default: Date.now() }

});



const Message = mongoose.model('message', messageSchema);

module.exports = Message;