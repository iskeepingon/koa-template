const ImagesServices = require('../services/images.services')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.config')

class MenusControllers {
    constructor() {

    }

    async deleteOne(ctx) {
        let { _id } = ctx.query
        ctx.verifyParams({
            _id: {
                type: 'string',
                required: true
            }
        })
       
        let res= await ImagesServices.deleteOne({ _id })
        ctx.body = { code: 1, data: res }
    }

    async updateOne(ctx) {
        let { _id } = ctx.query
        let { name, url } = ctx.request.body

        ctx.verifyParams({
            name: {
                type: 'string',
                required: true,
                max: 20
            },
            url: {
                type: 'string',
                required: true
            },
        })

        let findData = await ImagesServices.findOne({ name: name })
        if( findData ) {
            ctx.body = { code: 0, err: { info :"图片名称不能重复" }}
        } else {  
            let res = await ImagesServices.updateOne({ _id, name, url })
            ctx.body = { code: 1, data: res }
        }
    }

    async getOne(ctx) {
        let { name } = ctx.query
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true
            }
        })
        let res = await ImagesServices.findOne({ name: name })
         ctx.body = { code: 1, data: res }
    }

    async createOne(ctx) {
        let { name, url } = ctx.request.body
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true,
                max: 20
            },
            url: {
                type: 'string',
                required: true
            }
        })

        let findData = await ImagesServices.findOne({ name: name })
        if( findData ) {
            ctx.body = { code: 0, err: { info :"图片名称不能重复" }}
        } else {
            let res = await ImagesServices.createOne({ name, url,  createTime: Date.now() })
            ctx.body = { code: 1, data: res }
        }
    }

    async getList(ctx) {
        let { name , currentPage, pageSize } = ctx.query
        currentPage = parseInt(currentPage) || 1
        pageSize = parseInt(pageSize) || 10
        name = name

        let res = await ImagesServices.find( { name, currentPage, pageSize})
        let res1 = await ImagesServices.count()
        ctx.body = { code: 1, totalSize: res1, data: res }
        
    }
}

module.exports = new MenusControllers