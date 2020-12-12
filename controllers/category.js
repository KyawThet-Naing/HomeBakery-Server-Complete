const Category_DBModel = require("../models/category");
const Product_DBModel = require('../models/product');
const Base_DB = require("../services/db");
const helper = require("../utils/helper");
const CategoryDB_Service = new Base_DB(Category_DBModel);


let create = async (req, res, next) => {
    let existCategory = await CategoryDB_Service.findOne({ name: req.body.name });
    if (existCategory != null) {
        res.json(helper.msgFormatter(0, "This Category Name is Already Exist!"));
        return;
    }
    let result = await CategoryDB_Service.save(req.body);
    res.status(200).json(helper.msgFormatter(1, "New Category Created!", result));
}


let getAllCategory = async (req, res, next) => {
    let result = await CategoryDB_Service.findAll({}, req.body.skip);
    let categoryCount = await CategoryDB_Service.docCount();
    if (result) {
        res.status(200).json(helper.msgFormatter(1, "All Category!", { categories: result, categoryCount: categoryCount }));
        return;
    }
    res.json(helper.msgFormatter(0, "Ohh! Category is empty!"));

}

let update = async (req, res, next) => {
    await CategoryDB_Service.update(req.params.id, req.body);
    let result = await CategoryDB_Service.findOne({ _id: req.params.id });
    res.status(200).json(helper.msgFormatter(1, "Successfully Updated!", result));
}

let drop = async (req, res, next) => {


    let existProductThisCatID = await Product_DBModel.findOne({categoryId:req.params.id});
    if (existProductThisCatID != null) {
        res.json(helper.msgFormatter(0, "Ohh!..You need to delete all product with this category ID."));
    }
    else {
        let category = await CategoryDB_Service.findOne({ _id: req.params.id });

        if (category) {
            let result = await CategoryDB_Service.drop(req.params.id);
            res.status(200).json(helper.msgFormatter(1, "Successfully deleted!", result));
            return;
        }
        res.json(helper.msgFormatter(0, "Ohh! Category Not Found!"));
    }


}


let detail = async (req, res, next) => {
    let category = await CategoryDB_Service.findOne({ _id: req.params.id });

    if (category) {
        let result = await CategoryDB_Service.findOne({ _id: req.params.id });
        res.status(200).json(helper.msgFormatter(1, "Category detail!", result));
        return;
    }
    res.json(helper.msgFormatter(0, "Ohh! Category Not Found!"));

}

module.exports = {
    create,
    getAllCategory,
    update,
    drop,
    detail
}