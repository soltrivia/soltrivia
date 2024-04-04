const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('log')
const response = require('./middlewares/response')
const bodyParser = require('./middlewares/bodyparser')
const config = require('./config')

app.use(response)

app.use(bodyParser())

const router = require('./routes')
app.use(router.routes())

app.listen(config.port, () => debug(`listening on port ${config.port}`))
