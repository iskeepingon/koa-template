import mongoose from 'mongoose'

const coursesSchema = new mongoose.Schema(
    {
        phone: String,
        password: String
    },
    {
        collection: 'courses',
        id: true
    }
)

export default mongoose.model('courses', coursesSchema)