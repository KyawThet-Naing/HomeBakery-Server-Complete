const joi = require("joi");

module.exports = {
    orderSchema: {
        checkId: joi.object({
            id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        })
    }
}