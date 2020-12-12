const router = require("express-promise-router")();
const UserController = require("../controllers/user");
const CategoryController = require("../controllers/category");
const ProductController = require("../controllers/product");
const OrderController = require("../controllers/order");
const ChatMessage = require("../routes/chat");
const { Schema } = require("../schemas/user");
const { chatSchema } = require("../schemas/loadMsg");
const { orderSchema } = require("../schemas/order");
const { pSchema } = require("../schemas/product");
const { catSchema } = require("../schemas/category");
const { validateBody, validateToken, validateOwnerOrAdmin } = require("../utils/validator");

//user
router.post("/register", validateBody(Schema.register), UserController.register);
router.post("/login", validateBody(Schema.login), UserController.login);


//category
router.post("/categories", validateBody(catSchema.catBySkipCount), CategoryController.getAllCategory);

//get  product by category id
router.post("/product/by/category", validateBody(pSchema.getProductByCatID), ProductController.getAllProduct);


//order 
router.post('/order', validateToken(), OrderController.save);
router.post('/orders', validateToken(), OrderController.getOrder);
router.get('/orders_by_owner', validateOwnerOrAdmin(), OrderController.getOrdersbyOwner);
router.post('/drop_order', [validateOwnerOrAdmin(), validateBody(orderSchema.checkId)], OrderController.dropOrder);


//loadMessage
router.post('/load', [validateToken(), validateBody(chatSchema.loadMsg)], ChatMessage.load);
router.get('/getUserMsg', validateOwnerOrAdmin(), ChatMessage.getUserMsg);

module.exports = router