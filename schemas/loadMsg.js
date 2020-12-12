const joi = require("joi");

module.exports = {
    chatSchema: {
        loadMsg: joi.object({
           toGetMsg: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        })
    }
}