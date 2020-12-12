const helper = require("../utils/helper")
const Base_DB = require("../services/db");
const OrderDB_Model = require("../models/order");
const OwnerOrderDB_Model = require("../models/ownerOrder");
const OrderItemDB_Model = require("../models/orderItem");
const OwnerOrderItemDB_Model = require("../models/ownerOrderItem");
const OrderDB_Service = new Base_DB(OrderDB_Model);
const OrderItemDB_Service = new Base_DB(OrderItemDB_Model);
const OwnerOrderDB_Service = new Base_DB(OwnerOrderDB_Model);
const OwnerOrderItemDB_Service = new Base_DB(OwnerOrderItemDB_Model);


let save = async (req, res, next) => {
    let orderUser = helper.getUserFromToken(req);
    let orderData = { userId: orderUser._id, subTotal: req.body.subTotal, orderItems: [] };

    let saveOrder = await OrderDB_Service.save(orderData);
    let saveOwnerOrder = await OwnerOrderDB_Service.save(orderData);

    req.body.orderItems.forEach(async (orderItem) => {
        let orderItemData = {
            orderId: saveOwnerOrder._id,
            productId: orderItem.productId,
            price: orderItem.price,
            count: orderItem.count,
            taste: orderItem.taste,
            size: orderItem.size
        }

        let saveOwnerOrderItem = await OwnerOrderItemDB_Service.save(orderItemData);
        await OwnerOrderDB_Service.update(saveOwnerOrder._id, { $push: { orderItems: saveOwnerOrderItem._id } });
    });



    req.body.orderItems.forEach(async (orderItem) => {
        let orderItemData = {
            orderId: saveOrder._id,
            productId: orderItem.productId,
            price: orderItem.price,
            count: orderItem.count,
            taste: orderItem.taste,
            size: orderItem.size
        }

        let saveOrderItem = await OrderItemDB_Service.save(orderItemData);

        await OrderDB_Service.update(saveOrder._id, { $push: { orderItems: saveOrderItem._id } });
    });

    res.status(200).json(helper.msgFormatter(1, "Order Inserted."))

}

let getOrder = async (req, res, next) => {
    let orders = await OrderDB_Model.find({ userId: req.body.userId })
        .skip(Number(req.body.skip)).limit(Number(process.env.LIMIT_COUNT))
        .populate([{ path: 'userId' }, { path: 'orderItems', populate: { path: 'productId' } }]);


    // let orders = await OrderDB_Service.findAll({ userId: req.body.userId }, req.body.skip);

    // console.log(orders);
    // orders.forEach(order => {
    //     order.orderItems.forEach(async itemId => {

    //         // console.log(itemId);
    //         let product = await OrderItemDB_Model.findOne({ _id: itemId }).populate('productId', 'name');
    //          console.log(product);

    //     })
    //     console.log("one done");

    // });

    // let items = await OrderDB_Model.findOne({ _id:})
    // console.log(orders);
    res.json(helper.msgFormatter(1, 'Your Orders', orders));

}



let getOrdersbyOwner = async (req, res, next) => {

    // let orders = await OwnerOrderDB_Model.find().populate([{ path: 'orderItems',populate:{path:'productId'}},{ path: 'userId' }]);
    let orders = await OwnerOrderDB_Model.find().populate([{ path: 'userId' }, { path: 'orderItems', populate: { path: 'productId' } }]);
    res.json(helper.msgFormatter(1, 'User Orders', orders));

}


let dropOrder = async (req, res, next) => {
    let result = await OwnerOrderItemDB_Model.find({ orderId: req.body.id });
    if (result.length != 0) {
        result.forEach(async e => {
            await OwnerOrderItemDB_Model.findByIdAndDelete(e._id);
        });
        await OwnerOrderDB_Model.findByIdAndDelete(req.body.id);
        res.json(helper.msgFormatter(1, 'Drop Complete!'));
    } else {
        res.json(helper.msgFormatter(0, 'Order item not found!'));
    }
}

module.exports = {
    save,
    getOrder,
    getOrdersbyOwner,
    dropOrder,
}