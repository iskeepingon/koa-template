const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaOnerror = require('koa-onerror')
const KoaBodyparser = require('koa-bodyparser')
const KoaLogger = require('koa-logger')
const KoaJwt = require('koa-jwt')
const KoaParameter = require('./core/middlewares/koa-paramter')
const jwtConfig = require('./config/jwt.config')
const fs = require('fs')

const app = new Koa()
// KoaOnerror(app,{
//     all(ctx){
//         console.log('系统异常')
//         ctx.body = '系统异常'
//     }
// })
const koaRouter = KoaRouter()

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function (ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401
            ctx.body = {
                code: 0,
                err: {
                    info: `${err.message || 'Protected resource, use Authorization header to get access\n'}`
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
            console.log(err)
            ctx.status = 200
            ctx.body = {
                code: 0,
                err: {
                    info: `${err.errmsg || err.err.errmsg}`
                }
            }
        }
    })
})

app.use(KoaParameter(app))
app.use(KoaLogger())

app.use(KoaJwt({ secret: jwtConfig.secret }).unless({
    path: [/^\/users\/login/]
}))
app.use(KoaBodyparser())

fs.readdirSync(`${__dirname}/core/routers`).forEach(file => {
    const route = require(`${__dirname}/core/routers/${file}`)
    const routes = route.routes()
    app.use(route.routes()).use(route.allowedMethods())
})

module.exports = app