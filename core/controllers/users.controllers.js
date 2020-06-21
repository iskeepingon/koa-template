import usersServices from '../services/users.services.js'
import jwt from 'jsonwebtoken'
import jwtConfig from '../../config/jwt.config.js'

const usersControllers = {}

usersControllers.getList = {
    type: 'get',
    fn: async (ctx, next) => {
        let { code, res, err } = await usersServices.query()
        if (code == 1) {
            ctx.body = { code: 1, res }
        } else {
            next(err)
        }
    }
}

usersControllers.login = {
    type: 'post',
    fn: async (ctx, next) => {
        let { phone, password } = ctx.request.body
        let { code, res, err } = await usersServices.query({ phone, password })
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

export default usersControllers