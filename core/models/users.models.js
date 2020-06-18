import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema(
    {
        phone: String,
        password: String
    },
    {
        collection: 'users',
        id: true
    }
)

export default mongoose.model('users', usersSchema)