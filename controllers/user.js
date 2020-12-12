const User_DBModel = require("../models/user");
const Base_DB = require("../services/db");
const helper = require("../utils/helper");
const UserDB_Service = new Base_DB(User_DBModel);


let createUser = async (role, msgOk, req, res, next) => {
    let existPhone = await UserDB_Service.findOne({ phone: req.body.phone });
    if (existPhone != null) {
        res.json(helper.msgFormatter(0, "This Phone Number is Already Registered!"));
        return;
    }
    req.body.password = helper.encodePassword(req.body.password);
    req.body["role"] = role;
    let result = await UserDB_Service.save(req.body);
    let resultObj = result.toObject();
    delete resultObj.password;
    let token = helper.makeToken(resultObj);
    resultObj["token"] = token;
    res.status(200).json(helper.msgFormatter(1, msgOk, resultObj));

}

let register = (req, res, next) => {
    return createUser("User", "Register Success!", req, res, next);
}

let addAdmin = (req, res, next) => {
    return createUser("Admin", "New Admin Added!", req, res, next);
}

let login = async (req, res, next) => {

    let user = await UserDB_Service.findOne({ phone: req.body.phone });

    if (user != null) {

        if (helper.comparePassword(req.body.password, user.password)) {



            if (!user.banned) {
                let userObj = user.toObject();
                delete userObj.password;

                let token = helper.makeToken(userObj);
                userObj["token"] = token;

                res.status(200).json(helper.msgFormatter(1, "Login Success!", userObj));
                return;
            }

            res.status(200).json(helper.msgFormatter(0, "You are banned!",));


        } else {
            res.json(helper.msgFormatter(0, "Incorrect password!"))
        }
        return;
    }
    res.json(helper.msgFormatter(0, "Ohh! User Not Found!"));

}

let getAll = async (role, msgOk, msgNotOk, req, res, next) => {

    let allResult = await UserDB_Service.findAll({ role: role }, req.body.skip);

    if (allResult != null) {
        res.status(200).json(helper.msgFormatter(1, msgOk, allResult));
        return;
    }
    res.json(helper.msgFormatter(0, msgNotOk));

}

let getAllAdmin = async (req, res, next) => {
    return getAll("Admin", "All Admin", "Ohh! Admin is empty!", req, res, next);
}

let getAllUser = async (req, res, next) => {
    return getAll("User", "All User", "Ohh! User is empty!", req, res, next);
}

let update = async (req, res, next) => {
    await UserDB_Service.update(req.params.id, req.body);
    let result = await UserDB_Service.findOne({ _id: req.params.id });
    res.status(200).json(helper.msgFormatter(1, "Successfully Updated!", result));
}

let drop = async (req, res, next) => {
    let user = await UserDB_Service.findOne({ _id: req.params.id });
    if (user) {
        let result = await UserDB_Service.drop(req.params.id);
        res.status(200).json(helper.msgFormatter(1, "Successfully deleted!", result));
        return;
    }
    res.json(helper.msgFormatter(0, "Ohh! User Not Found!"));


}

let detail = async (req, res, next) => {
    let user = await UserDB_Service.findOne({ _id: req.params.id });

    if (user) {
        if (!user.banned) {
            res.status(200).json(helper.msgFormatter(1, "User detail!", user));
            return;
        }
        res.status(200).json(helper.msgFormatter(0, "Your acccount is banned!"));

    } else
        res.json(helper.msgFormatter(0, "Ohh! User Not Found!"));

}

module.exports = {

    register,
    login,
    getAllUser,
    update,
    drop,
    detail,
    addAdmin,
    getAllAdmin

}