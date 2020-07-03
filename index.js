import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaOnerror from 'koa-onerror'
import KoaBodyparser from 'koa-bodyparser'
import KoaLogger from 'koa-logger'
import KoaJwt from 'koa-jwt'
import KoaParameter from './core/middlewares/koa-paramter.js'
import Routers from './core/routers.js'
import jwtConfig from './config/jwt.config.js'

const app = new Koa()
// KoaOnerror(app,{
//     all(ctx){
//         console.log('系统异常')
//         ctx.body = '系统异常'
//     }
// })
const koaRouter = KoaRouter()

// 中间件 https://www.cnblogs.com/LChenglong/p/12118666.html
// koa-onerror
// koa-router
// koa-bodyparser
// koa-multer
// koa-session
// koa-jwt
// koa-compress
// koa-helmet
// koa-logger
// koa2-cors
// koa-parameter

// 数据库
// mongoose http://www.mongoosejs.net/docs/index.html

// 用户权限 
// https://www.cnblogs.com/pl-boke/p/10063351.html 
// https://www.cnblogs.com/swordfall/p/10841418.html

app.use(KoaParameter(app))
app.use(KoaLogger())

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function (ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401
            ctx.body = {
                code: 0,
                err: {
                    info: `Protected resource, use Authorization header to get access\n`
                }
            }
        } else if (422 == err.status) {
            ctx.status = 200
            ctx.body = {
                code: 0,
                err: {
                    info: `${err.errors[0].message}`
                }
            }
        } else {
            throw err
        }
    })
})

app.use(KoaJwt({ secret: jwtConfig.secret }).unless({
    path: [/^\/usersControllers\/login/]
}))
app.use(KoaBodyparser())


Object.keys(Routers).map(item => {
    Object.keys(Routers[item]).map(itm => {
        const { type, fn } = Routers[item][itm]
        if (Array.isArray(fn)) {
            koaRouter[type](`/${item}/${itm}`, ...fn)
        } else {
            koaRouter[type](`/${item}/${itm}`, fn)
        }
    })
})
app.use(koaRouter.routes())
app.use(koaRouter.allowedMethods())

export default app