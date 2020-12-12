const RedisDB = require("async-redis").createClient();

module.exports = {
    setObj: async (key, value) => await RedisDB.set(key.toString(), JSON.stringify(value)),
    getObj: async (key) => JSON.parse(await RedisDB.get(key.toString())),
    removeObj: async (key) => await RedisDB.del(key.toString()),
}