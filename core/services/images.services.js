const ImagesModels = require('../models/images.models')

class ImagesServices {
    constructor() {
    }

    find(data = {}) {
        let { name, currentPage, pageSize } = data            
        let condition = {}
        if (name) {
            let reg = new RegExp(name,"g")
            condition.name = {$regex:reg} //name
        }
        return ImagesModels.find(condition).
            skip((currentPage - 1) * pageSize)
            .limit(pageSize)
    }

    count() {
        return ImagesModels.count()
    }

    findOne(data = {}) {
        return ImagesModels.findOne(data)
    }

    createOne(data = {}) {
        let imagesModels = new ImagesModels(data)
        return imagesModels.save(data)
    }

    updateOne(data = {}) {
        let { _id, name, url } = data
        return ImagesModels.updateOne({ _id }, { name, url  })
    }

    deleteOne(data = {}) {
        let { _id } = data
        return ImagesModels.deleteOne({ _id })
    }
}

module.exports = new ImagesServices()