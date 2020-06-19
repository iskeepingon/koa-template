import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaOnerror from 'koa-onerror'
import KoaBodyparser from 'koa-bodyparser'
import KoaLogger from 'koa-logger'
import KoaJwt from 'koa-jwt'
import Routers from './core/routers.js'

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

// 数据库
// mongoose http://www.mongoosejs.net/docs/index.html

// 用户权限 
// https://www.cnblogs.com/pl-boke/p/10063351.html 
// https://www.cnblogs.com/swordfall/p/10841418.html

Object.keys(Routers).map(item => {
    Object.keys(Routers[item]).map(itm => {
        const { type, fn } = Routers[item][itm]
        koaRouter[type](`/${item}/${itm}`, fn)
    })
})

app.use(KoaLogger())
app.use(KoaJwt({ secret: 'shared-secret' }).unless({
    path: [/^\/usersControllers\/login/]
}))
app.use(KoaBodyparser())
app.use(koaRouter.routes())
app.use(koaRouter.allowedMethods())

export default app