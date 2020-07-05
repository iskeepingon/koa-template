const mongoose = require('mongoose')

const menusSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        remark: { type: String, required: false },
        url: { type: String, required: false },
        number: { type: Number, required: false },
        icon: { type: String, required: false },
        parentId: { type: String, required: true },
        createTime: { type: Number, required: true }
    },
    {
        collection: 'menus',
        id: true
    }
)

module.exports = mongoose.model('menus', menusSchema)