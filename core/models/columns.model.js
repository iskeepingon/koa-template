const mongoose = require('mongoose')

const columnSchema = new mongoose.Schema(
    {
      name: { type:String , required: true, unique: true },
      remark: { type:String,required: false },
      parentId:{ type:String, required: true },
      createTime: { type:String, required:true}
    },
    {
      collection: 'columns',
      id: true
    }
)

module.exports = mongoose.model('columns',columnSchema)
