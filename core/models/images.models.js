const mongoose = require('mongoose')

const imagesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        url: { type: String, required: true },
        createTime :{ type: String, required: true }
    },
    {
        collection: 'images',
        id: true
    }
)

module.exports = mongoose.model('images', imagesSchema)