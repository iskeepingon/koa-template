const MenusModels = require('../models/menus.models')

class MenusServices {
    constructor() {
    }

    find(data = {}) {
        return new Promise((resolve, reject) => {
            let { phone, currentPage, pageSize } = data
            let condition = {}
            if (phone) {
                condition.phone = phone
            }
            MenusModels.find(condition).
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
            MenusModels.count().then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    findOne(data = {}) {
        return new Promise((resolve, reject) => {
            MenusModels.findOne(data).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    createOne(data = {}) {
        return new Promise((resolve, reject) => {
            let menusModels = new MenusModels(data)
            menusModels.save(data).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    updateOne(data = {}) {
        return new Promise((resolve, reject) => {
            let { _id, name, remark, url, number, icon } = data
            MenusModels.updateOne({ _id }, { name, remark, url, number, icon }).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    deleteOne(data = {}) {
        return new Promise((resolve, reject) => {
            let { _id } = data
            MenusModels.deleteOne({ _id }).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }
}

module.exports = new MenusServices()