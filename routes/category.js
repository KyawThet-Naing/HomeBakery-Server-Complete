const router = require("express-promise-router")();
const CategoryContoller = require("../controllers/category");
const { catSchema } = require("../schemas/category");
const { GSchema } = require("../schemas/gschema");
const { validateBody, validateOwner, validateParam } = require("../utils/validator");

router.post("/create", [validateOwner(), validateBody(catSchema.create)], CategoryContoller.create);
router.route("/:id")
    .get([validateOwner(), validateParam(GSchema.id, 'id')], CategoryContoller.detail)
    .patch([validateOwner(), validateParam(GSchema.id, 'id')], CategoryContoller.update)
    .delete([validateOwner(), validateParam(GSchema.id, 'id')], CategoryContoller.drop);



module.exports = router;