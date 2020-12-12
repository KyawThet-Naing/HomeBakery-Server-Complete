class Base_DB {
    constructor(DBMolde) {
        this.DBMolde = DBMolde;
    }

    async save(data) {
        return await this.DBMolde(data).save();
    }

    async findOne(filter) {
        return await this.DBMolde.findOne(filter);
    }

    async findAll(filter, skipCount) {
        return await this.DBMolde.find(filter).skip(Number(skipCount))
            .limit(Number(process.env.LIMIT_COUNT));
    }

    async update(id, body) {
        return await this.DBMolde.findByIdAndUpdate(id, body);
    }

    async drop(id) {
        return await this.DBMolde.findByIdAndDelete(id);
    }
    async docCount() {
        return await this.DBMolde.countDocuments();
    }

}


module.exports = Base_DB