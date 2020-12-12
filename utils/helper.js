const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let msgFormatter = function (con, msg, result) {
    if (con == 1) con = true;
    else con = false;
    return {
        con: con,
        msg: msg,
        result: result
    }
}


let getToken = (req) => {
    if (req.headers.authorization != undefined) {
       // console.log(req.headers.authorization);
        let token = req.headers.authorization.split(" ")[1];
        //  console.log(token);
        return token;
    }
    return false;
}


let getUserFromToken = (req) => {
    let token = getToken(req);
    if (token != false) {
      //  console.log(token);
        let user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
    }
    return false;

}

module.exports = {
    getUserFromToken,
    msgFormatter,
    encodePassword: (password) => bcrypt.hashSync(password, 10),
    comparePassword: (plainPassword, encodedPassword) => bcrypt.compareSync(plainPassword, encodedPassword),
    makeToken: (data) => jwt.sign(data, process.env.SECRET_KEY)

}