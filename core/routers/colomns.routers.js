const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/column' })
const {
    updateOne,
    getOne,
    createOne,
    createRootOne,
    deleteOne,
    getList
} = require('../controllers/columns.controllers')

router.post('/updateOne', updateOne)

router.get('/getOne', getOne)

router.post('/createOne', createOne)

router.post('/createRootOne', createRootOne)

router.get('/deleteOne', deleteOne)

router.get('/getList', getList)

module.exports = router