import usersModels from '../models/users.models.js'

class menusServices {
    constructor() {
    }

    query(data = {}) {
        return new Promise((resolve, reject) => {
            usersModels.find(data, (err, res) => {
                if (err) {
                    reject({ code: 0, err })
                }
                resolve({ code: 1, data: res })
            })
        })
    }
}

export default new menusServices()