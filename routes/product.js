const router = require("express-promise-router")();
const ProductController = require("../controllers/product");
const { pSchema } = require("../schemas/product");
const { GSchema } = require("../schemas/gschema");
const { validateBody, validateOwnerOrAdmin, validateParam } = require("../utils/validator");

router.post("/create", [validateOwnerOrAdmin(), validateBody(pSchema.create)], ProductController.create);
router.route("/:id")
    .get([validateOwnerOrAdmin(), validateParam(GSchema.id, 'id')], ProductController.detail)
    .patch([validateOwnerOrAdmin(), validateParam(GSchema.id, 'id')], ProductController.update)
    .delete([validateOwnerOrAdmin(), validateParam(GSchema.id, 'id')], ProductController.drop);



module.exports = router;