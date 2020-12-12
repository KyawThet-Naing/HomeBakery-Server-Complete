const helper = require("./helper");
module.exports = {

    validateBody: (schema) => {
        return (req, res, next) => {
            let result = schema.validate(req.body);
            if (!result.error) {
                next();
            } else
                res.json(helper.msgFormatter(0, "Data Validation Error!"));
        }
    },
    validateParam: (schema, name) => {
        return (req, res, next) => {
            let result = schema.validate(req.params[name]);

            if (!result.error) {
                next();
            } else
                res.json(helper.msgFormatter(0, "Data Validation Error!"));
        }
    },

    validateOwner: () => {
        return (req, res, next) => {

            let user = helper.getUserFromToken(req);
            if (user) {
                if (user.role == "Owner") {
                    next();
                } else
                    res.json(helper.msgFormatter(0, "You don't have this permission!"));
                return;
            }
            res.json(helper.msgFormatter(0, "Token Error!"));
        }
    },
    validateOwnerOrAdmin: () => {
        return (req, res, next) => {
            let user = helper.getUserFromToken(req);
            if (user) {
                if (user.role == "Owner" || user.role == "Admin") {
                    next();
                } else
                    res.json(helper.msgFormatter(0, "You don't have this permission!"));
                return;
            }
            res.json(helper.msgFormatter(0, "Token Error!"));

        }
    }
    ,

    validateToken: () => {
        return (req, res, next) => {
            let user = helper.getUserFromToken(req);
            if (user) {
                next();
                return;
            }
            res.json(helper.msgFormatter(0, "Token Error!"));
        }
    }

}