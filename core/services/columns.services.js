const ColumnsModels = require('../models/columns.model')

class ColumnsServices {
    constructor() {
    }

    find() {
        return ColumnsModels.find()
    }

    findOne(data = {}) {
        return ColumnsModels.findOne(data)
    }

    createOne(data = {}) {
        let columnsModels = new ColumnsModels(data)
        return columnsModels.save(data)
    }

    updateOne(data = {}) {
        let { _id, name, remark} = data
        return ColumnsModels.updateOne({ _id }, { name, remark})
    }

    deleteOne(data = {}) {
        let { _id } = data
        return ColumnsModels.deleteOne({ _id })
    }
}

module.exports = new ColumnsServices()