const bodyParser = require('koa-bodyparser')


module.exports = (opts = {}) => {
    const options = Object.assign({}, {
        detectJSON (ctx) {
            if (ctx.request.type === 'text/xml') {
                return true
            } else {
                return false
            }
        }
    }, opts)

    return bodyParser(options)
}
