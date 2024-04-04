const { message: { checkSignature } } = require('../qcloud')


async function get (ctx, next) {
    const { signature, timestamp, nonce, echostr } = ctx.query
    if (checkSignature(signature, timestamp, nonce)) ctx.body = echostr
    else ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'
}

async function post (ctx, next) {
    const { signature, timestamp, nonce } = ctx.query
    if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATURE'

    
    const body = ctx.request.body

    ctx.body = 'success'
}

module.exports = {
    post,
    get
}
