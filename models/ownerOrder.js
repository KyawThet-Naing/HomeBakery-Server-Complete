const mongoose = require("mongoose");

const { Schema } = mongoose;

const OwnerOrderSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, required: true , ref: 'user'},
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'ownerOrderItem' }],
    subTotal: { type: Number, required: true },
    created: { type: Date, default: Date.now() }

});

const OwnerOrder = mongoose.model('ownerOrder', OwnerOrderSchema);

module.exports = OwnerOrder;
