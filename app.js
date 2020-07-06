const mongoose = require('mongoose')
const app = require('./index')
const mongodbConfig = require('./config/mongodb.config')
const redisConfig = require('./config/redis.config')
const serverConfig = require('./config/server.config')

const mongodbUrl =
    `mongodb://${mongodbConfig.user}:${mongodbConfig.pass}@${mongodbConfig.host}:${mongodbConfig.port}/${mongodbConfig.db}?authSource=admin`

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', function () {
    console.log(`Mongoose connection open to ${mongodbUrl}`)
    app.listen(serverConfig.port, () => {
        console.log(`App is running at port ${serverConfig.port}`)
    })
})

mongoose.connection.on('error', function (err) {
    console.log(`Mongoose connection error: ${err}`)
})

mongoose.connection.on('disconnected', function () {
    console.log(`Mongoose connection disconnected`)
})

const redis = require('redis')
const client = redis.createClient(redisConfig)

client.on('error', function (error) {
    console.error(error)
})

client.on('connect', function () {

})

client.on('end', function () {

})