const fs = require('fs')
const qcloud = require('wafer-node-sdk')

const configs = require('./config')

const sdkConfig = (() => {
    const sdkConfigPath = '/data/release/sdk.config.json'

    try {
        const stats = fs.statSync(sdkConfigPath)

        if (!stats.isFile()) {
            return {}
        }
    } catch (e) {
        return {}
    }

    try {
        const content = fs.readFileSync(sdkConfigPath, 'utf8')
        return JSON.parse(content)
    } catch (e) {
        return {}
    }
})()


let mysql =  require('knex')({
    client: 'mysql',
    connection: {
        host: configs.mysql.host,
        port: configs.mysql.port,
        user: configs.mysql.user,
        password: configs.mysql.pass,
        database: configs.mysql.db,
        charset: configs.mysql.char
    }
})

module.exports = Object.assign({}, sdkConfig, configs,{
    auth:{
        authorizationMiddleware(ctx, next) {
            return next()
        },
        validationMiddleware(ctx, next) {
            return next()
        },
    },
    message: {
        checkSignature(){
            return true
        }
    },
    mysql
})
