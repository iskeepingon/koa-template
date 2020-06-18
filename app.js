import mongoose from 'mongoose'
import app from './index.js'
import databaseConfig from './config/database.config.js'

const DBURL =
    `mongodb://${databaseConfig.user}:${databaseConfig.pass}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.db}?authSource=admin`

mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DBURL)
    app.listen(3000)
})

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
})