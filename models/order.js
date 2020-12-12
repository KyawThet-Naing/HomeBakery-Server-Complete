const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'orderItem' }],
    subTotal: { type: Number, required: true },
    created: { type: Date, default: Date.now() }

});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
