const MenusServices = require('../services/menus.services')
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
        let { code, data, err } = await MenusServices.deleteOne({ _id })
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
            remark: {
                type: 'string',
                required: false,
                max: 100
            },
        })
        let { code, data, err } = await MenusServices.updateOne({ _id, name, remark, url, number, icon })
        if (code == 1) {
            ctx.body = { code: 1, data: data }
        } else {
            next(err)
        }
    }

    async getOne(ctx, next) {
        let { _id } = ctx.query
        ctx.verifyParams({
            _id: {
                type: 'string',
                required: true
            }
        })
        let { code, data, err } = await MenusServices.findOne({ _id: _id })
        if (code == 1) {
            ctx.body = { code: 1, data: data }
        } else {
            next(err)
        }
    }

    async createRootOne(ctx, next) {
        let { name, remark, url, number, icon } = ctx.request.body
        let parentId = '0'
        let createTime = Date.now()
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true,
                max: 20
            },
            remark: {
                type: 'string',
                required: false,
                max: 100
            }
        })
        let { code, data, err } = await MenusServices.createOne({ name, remark, url, number, icon, parentId, createTime })
        if (code == 1) {
            ctx.body = { code: 1, data: data }
        } else {
            next(err)
        }
    }

    async createOne(ctx, next) {
        let { name, remark, url, number, icon, parentId } = ctx.request.body
      
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true,
                max: 20
            },
            remark: {
                type: 'string',
                required: false,
                max: 100
            },
            parentId: {
                type: 'string',
                required: false,
            }
        })
        let { code, data, err } = await MenusServices.createOne({ name, remark, url, number, icon, parentId, createTime: Date.now() })
        if (code == 1) {
            ctx.body = { code: 1, data: data }
        } else {
            next(err)
        }
    }

    async getList(ctx, next) {
        let {  currentPage, pageSize } = ctx.query
        currentPage = parseInt(currentPage) || 1
        pageSize = parseInt(pageSize) || 10
        
        let res = await MenusServices.find({  currentPage, pageSize })
        let res1 = await MenusServices.count()
        if (res.code == 1 && res1.code == 1) {
            ctx.body = { code: 1, data: res.data, totalSize: res1.dataÒ }
        } else {
            next(err)
        }
    }
}

module.exports = new MenusControllers