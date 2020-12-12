const mongoose = require("mongoose");
const { Schema } = mongoose;

const OwnerOrderItemSchema = new Schema({

    orderId: { type: Schema.Types.ObjectId, required: true, ref: 'ownerOrder' },
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
    taste: { type: String, required: true },
    size: { type: String, required: true }

});

const OwnerOrderItem = mongoose.model('ownerOrderItem', OwnerOrderItemSchema);

module.exports = OwnerOrderItem;