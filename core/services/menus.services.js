const MenusModels = require('../models/menus.models')

class MenusServices {
    constructor() {
    }

    find() {
        return MenusModels.find()
    }

    findOne(data = {}) {
        return MenusModels.findOne(data)
    }

    createOne(data = {}) {
        let menusModels = new MenusModels(data)
        return menusModels.save(data)
    }

    updateOne(data = {}) {
        let { _id, name, remark, url, number, icon } = data
        return MenusModels.updateOne({ _id }, { name, remark, url, number, icon })
    }

    deleteOne(data = {}) {
        let { _id } = data
        return MenusModels.deleteOne({ _id })
    }
}

module.exports = new MenusServices()