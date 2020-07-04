const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
    {
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createTime: { type: Number, required: true }
    },
    {
        collection: 'users',
        id: true
    }
)

module.exports = mongoose.model('users', usersSchema)