
const fs = require('fs')
const path = require('path')
const { mysql: config } = require('../config')

console.log('\n======================================')

const INIT_DB_FILE = path.join(__dirname, './cAuth.sql')

const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        charset: config.char,
        multipleStatements: true
    }
})

const content = fs.readFileSync(INIT_DB_FILE, 'utf8')

DB.raw(content).then(res => {
    process.exit(0)
}, err => {
    throw new Error(err)
})
