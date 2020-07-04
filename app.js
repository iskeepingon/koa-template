const mongoose = require('mongoose')
const app = require('./index')
const databaseConfig = require('./config/database.config')
const serverConfig = require('./config/server.config')

const DBURL =
    `mongodb://${databaseConfig.user}:${databaseConfig.pass}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.db}?authSource=admin`

mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', function () {
    console.log(`Mongoose connection open to ${DBURL}`)
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