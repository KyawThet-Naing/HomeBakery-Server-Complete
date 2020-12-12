const joi = require("joi");


module.exports = {

    Schema: {
        register: joi.object({
            name: joi.string().required(),
            phone: joi.string().min(7).required(),
            password: joi.string().min(6).required()
        }),

        login: joi.object({
            phone: joi.string().min(7).required(),
            password: joi.string().min(6).required()
        }),

        getUser: joi.object({
            skip: joi.number().required()
        })
    }
}