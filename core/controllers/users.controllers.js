const usersServices = require('../services/users.services')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.config')

class UsersControllers {
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
        let res = await usersServices.deleteOne({ _id })
        ctx.body = { code: 1, data: res }
    }

    async updateOne(ctx) {
        let { phone, password, roleId, _id } = ctx.request.body
        ctx.verifyParams({
            phone: {
                type: 'phone',
                required: true
            },
            password: {
                type: 'password',
                required: true,
                min: 6
            }
        })
        let res = await usersServices.updateOne({ _id, phone, password })
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

        let res = await usersServices.findOne({ _id: _id })
        ctx.body = { code: 1, data: res }
    }

    async createOne(ctx) {
        let { phone, password, roleId } = ctx.request.body
        ctx.verifyParams({
            phone: {
                type: 'phone',
                required: true
            },
            password: {
                type: 'password',
                required: true,
                min: 6
            }
        })
        let res = await usersServices.createOne({ phone, password, createTime: Date.now() })
        ctx.body = { code: 1, data: res }
    }

    async getList(ctx) {
        let { phone, currentPage, pageSize } = ctx.query
        currentPage = parseInt(currentPage) || 1
        pageSize = parseInt(pageSize) || 10
        phone = phone
        ctx.verifyParams({
            phone: {
                type: 'phone',
                required: false
            }
        })
        let res = await usersServices.find({ phone, currentPage, pageSize })
        let res1 = await usersServices.count()
        ctx.body = { code: 1, data: res, totalSize: res1 }
    }

    async login(ctx) {
        let { phone, password } = ctx.request.body
        ctx.verifyParams({
            phone: {
                type: 'phone',
                required: true,
            },
            password: {
                type: 'password',
                required: true,
                min: 6
            }
        })
        let res = await usersServices.findOne({ phone, password })
        if (res) {
            let { phone, _id } = res
            const token = jwt.sign({ phone, _id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
            ctx.body = { code: 1, data: { token } }
        } else {
            ctx.body = { code: 0, err: { info: 'no find' } }
        }
    }

    async logout(ctx) {
        let { phone, password } = ctx.request.body
        let res = await usersServices.findOne({ phone, password })
        if (res) {
            const token = jwt.sign({ data }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
            ctx.body = { code: 1, data: { token } }
        } else {
            ctx.body = { code: 0, err: { info: 'no find' } }
        }
    }
}

module.exports = new UsersControllers