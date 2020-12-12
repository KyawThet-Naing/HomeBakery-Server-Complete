const router = require("express-promise-router")();
const UserController = require("../controllers/user");
const { Schema } = require("../schemas/user");
const { GSchema } = require("../schemas/gschema");
const { validateBody, validateOwnerOrAdmin, validateOwner, validateParam } = require("../utils/validator");

router.post("/allUser", [validateOwnerOrAdmin(), validateBody(Schema.getUser)], UserController.getAllUser);
router.post("/allAdmin", [validateOwner(), validateBody(Schema.getUser)], UserController.getAllAdmin);
router.post("/addAdmin", [validateOwner(), validateBody(Schema.register)], UserController.addAdmin);


router.route("/:id")
    .get([validateOwnerOrAdmin(), validateParam(GSchema.id, 'id')], UserController.detail)
    .patch([validateOwnerOrAdmin(), validateParam(GSchema.id, 'id')], UserController.update)
    .delete([validateOwnerOrAdmin(), validateParam(GSchema.id, 'id')], UserController.drop);

module.exports = router