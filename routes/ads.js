const router = require("express-promise-router")();
const ADSModel_DB = require("../models/ads");
const helper = require("../utils/helper");
const { adsSchema } = require("../schemas/ads");
const { validateOwnerOrAdmin, validateBody } = require("../utils/validator");


// router.post('/create', [validateOwnerOrAdmin(), validateBody(adsSchema.create)], async (req, res, next) => {
//     let saveAds = await new ADSModel_DB(req.body).save();
//     res.json(helper.msgFormatter(1, "Success", saveAds));
// });

router.get('/get', async (req, res, next) => {
    let data = await ADSModel_DB.findOne({});
    res.json(helper.msgFormatter(1, "Success", data));
});

router.patch('/update', [validateOwnerOrAdmin(), validateBody(adsSchema.update)], async (req, res, next) => {
    let updateAds = await ADSModel_DB.findByIdAndUpdate({ _id: req.body.id }, req.body);
    res.json(helper.msgFormatter(1, "Update Success!", updateAds));
});


module.exports = router