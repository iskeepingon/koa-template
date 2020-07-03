import usersServices from '../services/users.services.js'
import jwt from 'jsonwebtoken'
import jwtConfig from '../../config/jwt.config.js'

const usersControllers = {}

usersControllers.getList = {
    type: 'get',
    fn: async (ctx, next) => {
        let { code, data, err } = await usersServices.query()
        if (code == 1) {
            ctx.body = { code: 1, data }
        } else {
            next(err)
        }
    }
}

usersControllers.login = {
    type: 'all',
    fn: async (ctx, next) => {
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
        let { code, data, err } = await usersServices.query({ phone, password })
        if (code == 1) {
            if (data.length > 0) {
                const token = jwt.sign({ data }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
                ctx.body = { code: 1, data: { token } }
            } else {
                ctx.body = { code: 0, err: { info: 'no find' } }
            }
        } else {
            next(err)
        }
    }
}

usersControllers.logout = {
    type: 'get',
    fn: async (ctx, next) => {
        let { phone, password } = ctx.request.body
        let { code, data, err } = await usersServices.query({ phone, password })
        if (code == 1) {
            if (data.length > 0) {
                const token = jwt.sign({ data }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
                ctx.body = { code: 1, data: { token } }
            } else {
                ctx.body = { code: 0, err: { info: 'no find' } }
            }
        } else {
            next(err)
        }
    }
}

export default usersControllers