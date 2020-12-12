const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderItemSchema = new Schema({

    orderId: { type: Schema.Types.ObjectId, required: true, ref: 'order' },
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
    taste: { type: String, required: true },
    size: { type: String, required: true }

});

const OrderItem = mongoose.model('orderItem', OrderItemSchema);

module.exports = OrderItem;