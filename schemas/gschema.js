const joi = require("joi");
module.exports = {

    GSchema: {
        skip: joi.number().required(),
        id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
}