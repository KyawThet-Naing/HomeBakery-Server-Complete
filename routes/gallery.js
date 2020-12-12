const router = require("express-promise-router")();
const multer = require("multer");
const GalleryDB_Model = require("../models/gallery");
const helper = require("../utils/helper");
const { GSchema } = require("../schemas/gschema");
const { validateParam, validateOwner } = require("../utils/validator");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({ storage: storage });



//Single file upload
router.post("/file", upload.single("photo"), async (req, res, next) => {

    let path = `http://${process.env.IP_ADDRESS + ':' + process.env.PORT + '/' + req.file.destination + req.file.filename}`;

    let saveGallery = {
        name: req.file.originalname,
        filename: req.file.filename,
        folder: req.file.destination,
        path: path
    }

    let result = await new GalleryDB_Model(saveGallery).save();
    res.status(200).json(helper.msgFormatter(1, "Single file image upload !", result));
});

//multiple file upload
router.post("/files", upload.array("photos"), async (req, res, next) => {
    let fileDatas = [];
    for (const index in req.files) {
        let file = req.files[index];
        let path = `http://${process.env.IP_ADDRESS + ':' + process.env.PORT + '/' + file.destination + file.filename}`;
        let saveGallery = {
            name: file.originalname,
            filename: file.filename,
            folder: file.destination,
            path: path
        }
        fileDatas.push(saveGallery);
    }
    let result = await GalleryDB_Model.collection.insertMany(fileDatas);
    res.status(200).json(helper.msgFormatter(1, "Multiple files image upload !", result));
});


//get all gallery with skip count
router.get("/paginate/:skip", [validateOwner(), validateParam(GSchema.skip, 'skip')], async (req, res, next) => {
    let result = await GalleryDB_Model.find().limit(Number(process.env.LIMIT_COUNT)).skip(Number(req.params.skip));
    let pageCount = await GalleryDB_Model.countDocuments();
    res.status(200).json(helper.msgFormatter(1, `Image for page ${Number(req.params.skip)}.`,
        { gallleryCount: pageCount, galleries: result }));
});

//delete img from database
router.delete("/delete/:id", [validateOwner(), validateParam(GSchema.id, 'id')], async (req, res, next) => {

    let findToDeleteImg = await GalleryDB_Model.findOne({ _id: req.params.id });

    if (findToDeleteImg == null) {
        res.status(200).json(helper.msgFormatter(0, "Can't find this Image!"));
        return;
    }
    await GalleryDB_Model.findByIdAndDelete(req.params.id);
    res.status(200).json(helper.msgFormatter(1, "Seccessfully Deleted!"))
})


module.exports = router;