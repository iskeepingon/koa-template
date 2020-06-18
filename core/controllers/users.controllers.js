import usersServices from '../services/users.services.js'
const usersControllers = {}

usersControllers.getUsers = {
    type: 'get',
    fn: async (ctx, next) => {
        let { code, res, err } = await usersServices.query()
        if (code == 1) {
            console.log('res', res)
            ctx.body = res
        } else {
            next(err)
        }
    }
}

export default usersControllers