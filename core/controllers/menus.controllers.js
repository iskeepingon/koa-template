import menusServices from '../services/menus.services.js'
import jwt from 'jsonwebtoken'
import jwtConfig from '../../config/jwt.config.js'

const menusControllers = {}

menusControllers.getUserList = {
    type: 'get',
    fn: async (ctx, next) => {
        let { code, res, err } = await menusServices.query()
        if (code == 1) {
            ctx.body = { code: 1, res }
        } else {
            next(err)
        }
    }
}

menusControllers.login = {
    type: 'all',
    fn: async (ctx, next) => {
        let { phone, password } = ctx.request.body
        ctx.verifyParams({
            phone: {
                type: 'string',
                required: true,
                convertType: (phone) => {
                    // 手机号校验
                    let reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
                    return reg.test(phone)
                }
            },
            password: {
                type: 'string',
                required: true
            }
        })
        let { code, res, err } = await menusServices.query({ phone, password })
        if (code == 1) {
            if (res.length > 0) {
                const token = jwt.sign({ data: res }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
                ctx.body = { code: 1, res: { token } }
            } else {
                ctx.body = { code: 0, err: { info: 'no find' } }
            }
        } else {
            next(err)
        }
    }
}

export default menusControllers