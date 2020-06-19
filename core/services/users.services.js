import usersModels from '../models/users.models.js'

class usersServices {
    constructor() {
    }

    query(data = {}) {
        return new Promise((resolve, reject) => {
            usersModels.find(data, (err, res) => {
                if (err) {
                    reject({ code: 0, err })
                }
                resolve({ code: 1, res })
            })
        })
    }
}

export default new usersServices()