const joi = require("joi");

module.exports = {
    catSchema: {
        create: joi.object({
            name: joi.string().required(),
            image: joi.string().required()
        }),
        catBySkipCount: joi.object({
            skip: joi.number().required()
        })
    }
}