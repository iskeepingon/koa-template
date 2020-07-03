import mongoose from 'mongoose'

const menusSchema = new mongoose.Schema(
    {
        phone: String,
        password: String
    },
    {
        collection: 'menus',
        id: true
    }
)

export default mongoose.model('menus', menusSchema)