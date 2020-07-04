const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/users' })
const {
    updateOne,
    getOne,
    createOne,
    getList,
    login,
    logout
} = require('../controllers/users.controllers.js')

router.post('/updateOne', updateOne)

router.get('/getOne', getOne)

router.post('/createOne', createOne)

router.get('/getList', getList)

router.get('/logout', logout)

router.post('/login', login)

module.exports = router