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
            ctx.status = 200
            ctx.body = {
                code: 0,
                err: {
                    info: `${err.err.errmsg}`
                }
            }
        }
    })
})

app.use(KoaJwt({ secret: jwtConfig.secret }).unless({
    path: [/^\/users\/login/]
}))
app.use(KoaBodyparser())

fs.readdirSync(`${__dirname}/core/routers`).forEach(file => {
    if (file === "index.js") {
        return
    }
    const route = require(`${__dirname}/core/routers/${file}`)
    app.use(route.routes()).use(route.allowedMethods())
})

module.exports = app