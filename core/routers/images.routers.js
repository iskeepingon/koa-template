const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/img' })
const {
    updateOne,
    getOne,
    createOne,
    deleteOne,
    getList
} = require('../controllers/images.controllers')

router.post('/updateOne', updateOne)

router.get('/getOne', getOne)

router.post('/createOne', createOne)

router.get('/deleteOne', deleteOne)

router.get('/getList', getList)

module.exports = router