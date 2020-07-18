const ImagesModels = require('../models/images.models')

class ImagesServices {
    constructor() {
    }

    find(data = {}) {
        return new Promise((resolve, reject) => {
            let { name, currentPage, pageSize } = data

            let condition = {}
            if (name) {
                condition.name = name
            }
            ImagesModels.find(condition).
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
            ImagesModels.count().then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    findOne(data = {}) {
        return new Promise((resolve, reject) => {
            ImagesModels.findOne(data).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    createOne(data = {}) {
        return new Promise((resolve, reject) => {
            let imagesModels = new ImagesModels(data)

            imagesModels.save(data).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    updateOne(data = {}) {
        return new Promise((resolve, reject) => {
            let { _id, name, url } = data
            ImagesModels.updateOne({ _id }, { name, url  }).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }

    deleteOne(data = {}) {
        return new Promise((resolve, reject) => {
            let { _id } = data
            ImagesModels.deleteOne({ _id }).then(res => {
                resolve({ code: 1, data: res })
            }).catch(err => {
                reject({ code: 0, err })
            })
        })
    }
}

module.exports = new ImagesServices()