const Redis = require("../services/redis");
const Message_DBModel = require("../models/message");
const helper = require("../utils/helper");


let activeUser = async (socket, user) => {
    user['socketID'] = socket.id;
    await Redis.setObj(socket.id, user);
    await Redis.setObj(user._id, user);

}
let initialize = async (io, socket) => {

    // socket.emit('message', { msg: "မင်္ဂလာပါ...ကောင်းသောနေ့ဖြစ်ပါစေ", type: "String", to: " ", from: "5fabe7ab578354063cd15ced", toGetMsg: " " });

    await activeUser(socket, socket.userData);

    socket.on('disconnect', async (_) => {
        let user = await Redis.getObj(socket.id);
        await Redis.removeObj(user._id);
        await Redis.removeObj(socket.id);

    });

    socket.on('message', async (data) => {

        // console.log(data);
        let result = await new Message_DBModel(data).save();
        // console.log(result);

        // let fullData = await Message_DBModel.findOne({ _id: result._id }).populate('from to ', 'name');


        // let fData = {
        //     from: fullData.from.name,
        //     fromId: fullData.from._id,
        //     to: fullData.to.name,
        //     toId: fullData.to._id,
        //     msg: fullData.msg,
        //     type: fullData.type,
        //     toGetMsg: fullData.toGetMsg
        // }
        //  console.log(fData);

        socket.emit('message', result);


        let toUser = await Redis.getObj(data.to);
        if (toUser != null) {
            let toSocket = toUser.socketID;
            io.of('/chat').connected[toSocket].emit('message', result);
            return;
        }
    }
    );
}


let load = async (req, res, next) => {
    let result = await Message_DBModel.find({ toGetMsg: req.body.toGetMsg });
    res.json(helper.msgFormatter(1, "Messages", result));

}


let getUserMsg = async (req, res, next) => {
    let result = await (await Message_DBModel.find().populate('from', 'name role')).reverse();


    function removeDuplicates(array) {
        let uniq = {};
        let result = [];
        // return array.filter(obj => !uniq[obj.toGetMsg] && (uniq[obj.toGetMsg] = true))
        let uniqData = array.filter(obj => !uniq[obj.from._id] && (uniq[obj.from._id] = true));
        uniqData.forEach(element => {
            if (element.from.role == 'User') {
                result.push(element);
            }

        });

        return result;
    }
    res.json(helper.msgFormatter(1, 'get message user', removeDuplicates(result)));

}
module.exports = {
    initialize,
    load,
    getUserMsg
}