const UsersModels = require('../models/users.models')

class UsersServices {
    constructor() {
    }

    find(data = {}) {
        let { phone, currentPage, pageSize } = data
        let condition = {}
        if (phone) {
            condition.phone = phone
        }
        return UsersModels
            .find(condition)
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize)
    }

    count() {
        return UsersModels.count()
    }

    findOne(data = {}) {
        return UsersModels.findOne(data)
    }

    createOne(data = {}) {
        let usersModels = new UsersModels(data)
        return usersModels.save(data)
    }

    updateOne(data = {}) {
        let { _id, phone, password } = data
        return UsersModels.updateOne({ _id }, { phone, password })
    }

    deleteOne(data = {}) {
        let { _id } = data
        return UsersModels.deleteOne({ _id })
    }
}

module.exports = new UsersServices()