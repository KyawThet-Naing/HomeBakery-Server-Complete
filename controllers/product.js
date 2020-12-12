const Product_DBModel = require("../models/product");
const Base_DB = require("../services/db");
const helper = require("../utils/helper");
const ProductDB_Service = new Base_DB(Product_DBModel);



let create = async (req, res, next) => {
    let existProduct = await ProductDB_Service.findOne({ name: req.body.name });
    if (existProduct != null) {
        res.json(helper.msgFormatter(0, "This Product Name is Already Exist!"));
        return;
    }
    let result = await ProductDB_Service.save(req.body);
    res.status(200).json(helper.msgFormatter(1, "New Product Created!", result));
}


let getAllProduct = async (req, res, next) => {
    let result = await ProductDB_Service.findAll({ categoryId: req.body.catId }, req.body.skip);
    let docCount = await ProductDB_Service.docCount();
    if (result) {
        res.status(200).json(helper.msgFormatter(1, "All Product!", { productsCount: docCount, products: result }));
        return;
    }
    res.json(helper.msgFormatter(0, "Ohh! Product Not Found!"));


}

let update = async (req, res, next) => {
    let product = await ProductDB_Service.findOne({ _id: req.params.id });

    if (product != null) {
        await ProductDB_Service.update(req.params.id, req.body);
        let result = await ProductDB_Service.findOne({ _id: req.params.id });
        res.status(200).json(helper.msgFormatter(1, "Successfully Updated!", result));
    } else {
        res.status(200).json(helper.msgFormatter(0, "Ohh! Product Not Found!!"));

    }

}

let drop = async (req, res, next) => {
    let product = await ProductDB_Service.findOne({ _id: req.params.id });
    if (product) {
        let result = await ProductDB_Service.drop(req.params.id);
        res.status(200).json(helper.msgFormatter(1, "Successfully deleted!", result));
        return;
    }
    res.json(helper.msgFormatter(0, "Ohh! Product Not Found!"));

}


let detail = async (req, res, next) => {
    let product = await ProductDB_Service.findOne({ _id: req.params.id });

    if (product) {
        let result = await ProductDB_Service.findOne({ _id: req.params.id });
        res.status(200).json(helper.msgFormatter(1, "Product detail!", result));
        return;
    }
    res.json(helper.msgFormatter(0, "Ohh! Product Not Found!"));

}


module.exports = {
    create,
    getAllProduct,
    update,
    drop,
    detail
}