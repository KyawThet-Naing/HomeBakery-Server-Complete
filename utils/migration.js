const User_DBModel = require("../models/user");
const Base_DB = require("../services/db");
const ADSModel_DBModel = require("../models/ads");
const helper = require("../utils/helper");
const UserDB_Service = new Base_DB(User_DBModel);
const AdsDB_Service = new Base_DB(ADSModel_DBModel);

let ownerMigration = async () => {

    let Owner = {
        name: "Owner",
        phone: "09123450",
        password: "123!@#",
        role: "Owner"
    }
    Owner.password = helper.encodePassword(Owner.password);
    await UserDB_Service.save(Owner);
    console.log('Owner Migrated!');
}


let adsMigration = async () => {

    let ads = {
        slideText: "Hello Burmese Developer",
        images: [
            "https://www.pixelstalk.net/wp-content/uploads/2016/05/Amazing-Eagle-Wallpaper-620x388.jpg",
            "https://image.winudf.com/v2/image/Y29tLnNnbS50aGVzdW53YWxscGFwZXJfc2NyZWVuc2hvdHNfMV9iODJmODI5NQ/screen-1.jpg?fakeurl=1&type=.jpg",
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
        ]
    }

    await AdsDB_Service.save(ads);
    console.log('Ads Migrated!');

}

module.exports = {
    ownerMigration,
    adsMigration
}

