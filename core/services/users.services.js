const UsersModels = require('../models/users.models.js')

class UsersServices {
    constructor() {
    }

    find(data = {}) {
        return new Promise((resolve, reject) => {
            let { phone, currentPage, pageSize } = data
            let condition = {}
            if (phone) {
                condition.phone = phone
            }
            UsersModels.find(condition).
                skip((currentPage - 1) * pageSize)
                .limit(pageSize).then(res => {
                    resolve({ code: 1, data: res })
                }).catch(err => {
                    reject({ code: 0, err })
                })
        })
    }

    count() {
        return new Promise((resolve, reject) => {
            UsersModels.count().then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    findOne(data = {}) {
        return new Promise((resolve, reject) => {
            UsersModels.findOne(data).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    createOne(data = {}) {
        return new Promise((resolve, reject) => {
            let usersModels = new UsersModels(data)
            usersModels.save(data).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    updateOne(data = {}) {
        return new Promise((resolve, reject) => {
            let { _id, phone, password } = data
            let usersModels = new UsersModels(data)
            usersModels.updateOne({ _id }, { phone, password }).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }
}

module.exports = new UsersServices()