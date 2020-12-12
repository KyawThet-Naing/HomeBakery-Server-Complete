const joi = require("joi");

module.exports = {
    adsSchema: {
        update: joi.object({
            slideText: joi.string().required(),
            images: joi.array().required(),
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
    }
}