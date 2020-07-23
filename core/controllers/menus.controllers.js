const MenusServices = require('../services/menus.services')
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
        let res = await MenusServices.findOne({ parentId: _id })
        if (res) {
            ctx.body = { code: 0, err: { info: 'can not be deleted,becuase the menu has submenus' } }
        } else {
            let res1 = await MenusServices.deleteOne({ _id })
            ctx.body = { code: 1, data: res1 }
        }
    }

    async updateOne(ctx) {
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
        let res = await MenusServices.updateOne({ _id, name, remark, url, number, icon })
        ctx.body = { code: 1, data: res }
    }

    async getOne(ctx) {
        let { _id } = ctx.query
        ctx.verifyParams({
            _id: {
                type: 'string',
                required: true
            }
        })
        let res = await MenusServices.findOne({ _id: _id })
        ctx.body = { code: 1, data: res }
    }

    async createRootOne(ctx) {
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
        let res = await MenusServices.createOne({ name, remark, url, number, icon, parentId, createTime })
        ctx.body = { code: 1, data: res }
    }

    async createOne(ctx) {
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
        let res = await MenusServices.createOne({ name, remark, url, number, icon, parentId, createTime: Date.now() })
        ctx.body = { code: 1, data: res }
    }

    async getList(ctx) {
        let res = await MenusServices.find()
        ctx.body = { code: 1, data: res }
    }
}

module.exports = new MenusControllers()