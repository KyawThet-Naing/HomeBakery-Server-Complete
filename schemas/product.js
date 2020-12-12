const joi = require("joi");

module.exports = {
    pSchema: {
        create: joi.object({
            name: joi.string().required(),
            images: joi.array().required(),
            desc: joi.string().required(),
            priceAndSize: joi.array().required(),
            servicePhone: joi.array().required(),
            taste: joi.array().required(),
            categoryId: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        getProductByCatID: joi.object({
            catId: joi.string().required(),
            skip: joi.number().required()
        })
    }
}