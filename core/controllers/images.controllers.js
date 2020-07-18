const ImagesServices = require('../services/images.services')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.config')

class MenusControllers {
    constructor() {

    }

    async deleteOne(ctx, next) {
        let { _id } = ctx.query

    
        ctx.verifyParams({
            _id: {
                type: 'string',
                required: true
            }
        })
       
        let { code, data, err } = await ImagesServices.deleteOne({ _id })
        if (code == 1) {
            ctx.body = { code: 1, data: data }
        } else {
            next(err)
        }
    }

    async updateOne(ctx, next) {

        let { _id } = ctx.query
        let { name, remark, url, number, icon } = ctx.request.body

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
        let { code, data, err } = await ImagesServices.updateOne({ _id, name, url })
        if (code == 1) {
            ctx.body = { code: 1, data: data }
        } else {
            next(err)
        }
    }

    async getOne(ctx, next) {
        let { name } = ctx.query
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true
            }
        })
        let { code, data, err } = await ImagesServices.findOne({ name: name })
       
        if (code == 1) {
            ctx.body = { code: 1, data: data }
        } else {
            next(err)
        }
    }

    async createOne(ctx, next) {
        let { name, url } = ctx.request.body
        console.log(ctx.request.body);
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

        let { data:findData} = await ImagesServices.findOne({ name: name })

        if( findData ) {
            ctx.body = { code: 0, err: { info :"图片名称不能重复" }}
        } else {
            let { code, data, err } = await ImagesServices.createOne({ name, url,  createTime: Date.now() })
            if (code == 1) {
                ctx.body = { code: 1, data: data }
            } else {
                next(err)
            }
        }
    }

    async getList(ctx, next) {
        let { name , currentPage, pageSize } = ctx.query
        currentPage = parseInt(currentPage) || 1
        pageSize = parseInt(pageSize) || 10
        name = name

        let res = await ImagesServices.find( {  name, currentPage, pageSize})
        let res1 = await ImagesServices.count()
        if (res.code == 1) {
            ctx.body = { code: 1, totalSize: res1.data, data: res.data }
        } else {
            next(err)
        }
    }
}

module.exports = new MenusControllers