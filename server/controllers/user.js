module.exports = async (ctx, next) => {

    if (ctx.state.$wxInfo.loginState === 1) {
        ctx.state.data = ctx.state.$wxInfo.userinfo
    } else {
        ctx.state.code = -1
    }
}
